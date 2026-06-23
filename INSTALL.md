# Install ParserTry

One command, no manual preparation. Works on **Windows, macOS, and Linux**.
The only prerequisite is **Python** — the installer sets up everything else
(virtual environment, dependencies, and the external OCR tools).

> The precompiled backend targets **CPython 3.12**. If you don't have it, the
> installer tries to install it for you (Homebrew / apt / dnf / Chocolatey / winget).
> Otherwise grab it from <https://www.python.org/downloads/>.

## Quick start

**macOS / Linux**

```bash
python3 install.py        # core install (fast, lightweight parsers)
python3 run.py            # start → opens http://localhost:8080
```

**Windows**

```bat
py install.py
py run.py
```

Or just double-click the launcher — it installs on first run, then starts:

- macOS: **start.command**
- Linux: **start.sh**
- Windows: **start.bat**

## Everything (all 21 parsers + OCR tools)

```bash
python3 install.py --full
```

`--full` additionally installs the heavy parsers (Docling, Marker, MinerU,
PaddleOCR, EasyOCR, OCRmyPDF, Unstructured, Camelot, Tabula, …) and the external
binaries they need (**tesseract**, **poppler**, **ghostscript**, **Java 11**) via
your system package manager. Anything that can't be installed is skipped — the
app still runs and simply marks unavailable parsers as "not installed".

## Cloud vision parsers (optional)

OpenAI / Claude / Gemini vision parsers need an API key. Add yours in the app's
**Settings**, or edit `settings.json` (created from `settings.example.json` on
first install). Keys are stored locally and never committed (`settings.json` is
git-ignored).

## Notes

- First launch with no parsers installed still works — you always get the core
  PyMuPDF / pdfplumber / pdfminer / pypdf / pymupdf4llm / MarkItDown parsers.
- To allow access from other machines: `python run.py --host 0.0.0.0`.
- To change the port: `python run.py --port 9000`.
