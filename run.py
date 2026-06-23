#!/usr/bin/env python3
"""
ParserTry — PDF parser comparison tool (launcher).

Usage:
    python run.py                 # start at http://localhost:8080
    python run.py --port 9000     # change port
    python run.py --host 0.0.0.0  # allow external access
    python run.py --no-browser    # do not open the browser

If a project-local virtual environment (.venv) exists, the app
re-executes itself with that interpreter so every installed parser is available.
Requires Python 3.10+ (3.12 recommended).
"""
import os
import sys
import argparse
import time
import threading

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def reexec_in_venv():
    """If a project .venv exists and we are not already running it, re-exec with that Python."""
    if os.environ.get("PARSERTRY_NO_VENV"):
        return
    venv_python = os.path.join(
        BASE_DIR, ".venv",
        "Scripts" if os.name == "nt" else "bin",
        "python.exe" if os.name == "nt" else "python",
    )
    current = os.path.realpath(sys.executable)
    if os.path.exists(venv_python) and os.path.realpath(venv_python) != current:
        print("Switching to the project virtual environment (.venv)...")
        os.environ["PARSERTRY_NO_VENV"] = "1"
        os.execv(venv_python, [venv_python] + sys.argv)


def ensure_system_tools_on_path():
    """Add common locations of external OCR tools (tesseract / ghostscript / poppler / java)
    to PATH so OCRmyPDF, Unstructured, OpenDataLoader, etc. can find their binaries."""
    extra = []
    if sys.platform == "darwin":
        extra = [
            "/opt/homebrew/opt/java11/bin",
            "/opt/homebrew/opt/openjdk@11/bin",
            "/opt/homebrew/bin",
            "/usr/local/bin",
        ]
        for java_home in ("/opt/homebrew/opt/java11", "/opt/homebrew/opt/openjdk@11"):
            if os.path.exists(os.path.join(java_home, "bin", "java")):
                os.environ.setdefault("JAVA_HOME", java_home)
                break
    elif os.name == "nt":
        extra = [
            r"C:\Program Files\Tesseract-OCR",
            r"C:\Program Files\gs\bin",
            r"C:\Program Files\poppler\bin",
            os.path.expandvars(r"%LOCALAPPDATA%\Programs\Tesseract-OCR"),
        ]
        for jh in (r"C:\Program Files\Java\jdk-11", r"C:\Program Files\Eclipse Adoptium\jdk-11"):
            if os.path.isdir(jh):
                os.environ.setdefault("JAVA_HOME", jh)
                break
    else:  # Linux / other
        extra = ["/usr/local/bin", "/usr/bin", "/snap/bin"]
        for jh in ("/usr/lib/jvm/java-11-openjdk", "/usr/lib/jvm/java-11-openjdk-amd64"):
            if os.path.isdir(jh):
                os.environ.setdefault("JAVA_HOME", jh)
                break
    paths = os.environ.get("PATH", "").split(os.pathsep)
    for p in extra:
        if p and os.path.isdir(p) and p not in paths:
            paths.insert(0, p)
    os.environ["PATH"] = os.pathsep.join(paths)


def check_requirements():
    """Verify the mandatory packages are installed; print install hints if not."""
    checks = {
        "fastapi": "fastapi",
        "uvicorn": "uvicorn",
        "fitz": "pymupdf",
        "PIL": "Pillow",
        "multipart": "python-multipart",
    }
    missing = []
    for mod, pkg in checks.items():
        try:
            __import__(mod)
        except ImportError:
            missing.append(pkg)
    if missing:
        print("=" * 60)
        print("Required packages are missing.")
        print("Run the installer first:   python install.py")
        print("or install manually:       pip install " + " ".join(missing))
        print("=" * 60)
        sys.exit(1)


def open_browser(url: str, delay: float = 1.5):
    def _open():
        try:
            import webbrowser
            time.sleep(delay)
            webbrowser.open(url)
        except Exception:
            pass
    threading.Thread(target=_open, daemon=True).start()


def main():
    reexec_in_venv()

    ap = argparse.ArgumentParser(description="ParserTry — PDF parser comparison tool")
    ap.add_argument("--host", default="127.0.0.1", help="bind host (default: 127.0.0.1)")
    ap.add_argument("--port", type=int, default=8080, help="port (default: 8080)")
    ap.add_argument("--no-browser", action="store_true", help="do not open the browser")
    ap.add_argument("--reload", action="store_true", help="dev mode (auto-reload on code change)")
    args = ap.parse_args()

    ensure_system_tools_on_path()
    check_requirements()

    url = f"http://localhost:{args.port}" if args.host == "127.0.0.1" else f"http://{args.host}:{args.port}"
    print("\n" + "=" * 60)
    print("  ParserTry — PDF parser comparison tool")
    print("=" * 60)
    print(f"  URL:  {url}")
    print("  Stop: Ctrl+C")
    print("=" * 60 + "\n")

    if not args.no_browser:
        open_browser(url)

    import uvicorn
    uvicorn.run("backend.main:app", host=args.host, port=args.port,
                reload=args.reload, log_level="warning", access_log=False)


if __name__ == "__main__":
    main()
