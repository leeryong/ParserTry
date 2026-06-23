#!/usr/bin/env python3
"""
ParserTry — one-command installer (Windows / macOS / Linux).

This bootstraps everything with no manual preparation:
  * creates a local virtual environment (.venv),
  * installs the core dependencies (always),
  * optionally installs every parser and the external OCR tools.

Usage:
    python install.py            # core install (lightweight, fast)
    python install.py --full     # + heavy parsers + system OCR tools
    python install.py --run      # install core, then start the app

The precompiled backend (.pyc) targets CPython 3.12, so this installer
prefers a Python 3.12 interpreter and will try to install one for you
(via Homebrew / apt / dnf / Chocolatey) when it is missing.
"""
import os
import sys
import shutil
import subprocess
import platform

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VENV_DIR = os.path.join(BASE_DIR, ".venv")
IS_WIN = os.name == "nt"
IS_MAC = sys.platform == "darwin"


def sh(cmd, check=True, **kw):
    print("  $ " + (cmd if isinstance(cmd, str) else " ".join(cmd)))
    return subprocess.run(cmd, shell=isinstance(cmd, str), check=check, **kw)


def which(name):
    return shutil.which(name)


# ── 1. Find (or install) a suitable Python 3.12 interpreter ──────────────────
def find_python():
    # exact 3.12 first; bytecode magic is tied to the minor version
    candidates = ["python3.12", "python3.12.exe"]
    if IS_WIN:
        candidates += ["py -3.12"]
    for c in candidates:
        exe = c.split()[0]
        if which(exe) or (" " in c):
            try:
                out = subprocess.run((c.split() if " " in c else [c]) + ["-c", "import sys;print('%d.%d'%sys.version_info[:2])"],
                                     capture_output=True, text=True)
                if out.stdout.strip() == "3.12":
                    return c
            except Exception:
                pass
    # current interpreter, if it is 3.12
    if sys.version_info[:2] == (3, 12):
        return sys.executable
    return None


def try_install_python():
    print("Python 3.12 not found — attempting to install it...")
    if IS_MAC and which("brew"):
        sh("brew install python@3.12", check=False)
    elif which("apt-get"):
        sh("sudo apt-get update -y", check=False)
        sh("sudo apt-get install -y python3.12 python3.12-venv", check=False)
    elif which("dnf"):
        sh("sudo dnf install -y python3.12", check=False)
    elif IS_WIN and which("choco"):
        sh("choco install -y python --version=3.12", check=False)
    elif IS_WIN and which("winget"):
        sh("winget install -e --id Python.Python.3.12", check=False)
    else:
        return None
    return find_python()


# ── 2. Create the virtual environment ────────────────────────────────────────
def venv_python():
    return os.path.join(VENV_DIR, "Scripts" if IS_WIN else "bin", "python.exe" if IS_WIN else "python")


def make_venv(py):
    if os.path.exists(venv_python()):
        print(".venv already exists — reusing it.")
        return
    print(f"Creating virtual environment with: {py}")
    sh((py.split() if " " in py else [py]) + ["-m", "venv", VENV_DIR])


def pip_install(args, check=False):
    vp = venv_python()
    sh([vp, "-m", "pip", "install", "--upgrade", "pip", "setuptools", "wheel"], check=False)
    return sh([vp, "-m", "pip", "install"] + args, check=check)


# ── 3. External OCR / table tools (optional, best-effort) ────────────────────
def install_system_tools():
    print("\nInstalling external OCR/table tools (best-effort)...")
    if IS_MAC:
        if not which("brew"):
            print("  Homebrew not found — skipping. See INSTALL.md to add tesseract/poppler/ghostscript/java manually.")
            return
        sh("brew install tesseract tesseract-lang poppler ghostscript openjdk@11", check=False)
    elif which("apt-get"):
        sh("sudo apt-get update -y", check=False)
        sh("sudo apt-get install -y tesseract-ocr tesseract-ocr-kor poppler-utils ghostscript default-jre", check=False)
    elif which("dnf"):
        sh("sudo dnf install -y tesseract poppler-utils ghostscript java-11-openjdk", check=False)
    elif IS_WIN and which("choco"):
        sh("choco install -y tesseract poppler ghostscript temurin11", check=False)
    elif IS_WIN and which("winget"):
        for pkg in ("UB-Mannheim.TesseractOCR", "oschwartz10612.Poppler", "ArtifexSoftware.GhostScript", "EclipseAdoptium.Temurin.11.JRE"):
            sh(f"winget install -e --id {pkg}", check=False)
    else:
        print("  No supported package manager found — install tesseract/poppler/ghostscript/java manually (see INSTALL.md).")


# ── main ─────────────────────────────────────────────────────────────────────
def main():
    full = "--full" in sys.argv
    run_after = "--run" in sys.argv

    print("=" * 64)
    print("  ParserTry installer  ·  " + platform.platform())
    print("=" * 64)

    py = find_python() or try_install_python()
    if not py:
        print("\nCould not find or install Python 3.12.")
        print("Please install Python 3.12 from https://www.python.org/downloads/ and re-run:  python install.py")
        sys.exit(1)

    make_venv(py)

    print("\nInstalling core dependencies...")
    pip_install(["-r", os.path.join(BASE_DIR, "requirements.txt")], check=True)

    if full:
        print("\nInstalling all parsers (this is large and may take a while)...")
        pip_install(["-r", os.path.join(BASE_DIR, "requirements-full.txt")], check=False)
        install_system_tools()

    # First run creates settings.json from the template if absent (no keys committed).
    cfg, tmpl = os.path.join(BASE_DIR, "settings.json"), os.path.join(BASE_DIR, "settings.example.json")
    if not os.path.exists(cfg) and os.path.exists(tmpl):
        shutil.copyfile(tmpl, cfg)
        print("\nCreated settings.json from the template (add your VLM API keys there or in the app).")

    print("\n" + "=" * 64)
    print("  Done.  Start the app with:")
    print("    " + ("py run.py" if IS_WIN else "python3 run.py") + "   (or use the start launcher)")
    if not full:
        print("  For every parser + OCR tools:  python install.py --full")
    print("=" * 64)

    if run_after:
        sh([venv_python(), os.path.join(BASE_DIR, "run.py")], check=False)


if __name__ == "__main__":
    main()
