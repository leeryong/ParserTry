<div align="center">
  <img src="frontend/assets/logo.png" width="120" alt="ParserTry" />
  <h1>ParserTry</h1>
  <p><b>Run and compare 21+ PDF parsers side by side — find the best fit for your documents.</b></p>
</div>

ParserTry is a local web app that runs many PDF parsers on the **same document**
and lets you compare their output (text, tables, figures, layout, bounding
boxes) side by side. Upload a PDF, pick the parsers, and see which one handles
your documents — Korean, scanned, handwritten, table-heavy, formula-heavy — best.

- **No build step** — Python backend + a static frontend (Alpine.js + Tailwind).
- **Cross-platform, one-command install** — Windows / macOS / Linux.
- **Graceful degradation** — heavy parsers are optional; the core set always works.

## 🟢 Easiest install (for everyone — no terminal needed)

**1. Install Python** (one time) — get it from <https://www.python.org/downloads/> and run the installer.
&nbsp;&nbsp;👉 On **Windows**, tick **“Add Python to PATH”** on the first screen.

**2. Download ParserTry** — click the green **`Code ▾`** button at the top of this page → **Download ZIP**, then unzip it.

**3. Start it** — open the unzipped folder and **double-click** your launcher:

| Your computer | Double-click |
|---|---|
| 🪟 Windows | **`start.bat`** |
| 🍎 macOS | **`start.command`** |
| 🐧 Linux | **`start.sh`** |

That's it. The first launch sets everything up automatically (this takes a few
minutes), then your browser opens at **http://localhost:8080**. Next time, the
same double-click starts it instantly.

> macOS may say *“cannot be opened because it is from an unidentified developer.”*
> Right-click `start.command` → **Open** → **Open** (only needed once).

<details><summary>Prefer the terminal? (advanced)</summary>

```bash
python3 install.py     # or: py install.py   (Windows)
python3 run.py         # opens http://localhost:8080
```

Full setup with every parser and OCR tool: `python3 install.py --full`.
See **[INSTALL.md](INSTALL.md)** for details.
</details>

## Parsers

| Parser | Library | Category | Strength |
|---|---|---|---|
| **PyMuPDF** | pymupdf | Engine | Fastest text/image extraction, bounding boxes |
| **PyMuPDF4LLM** | pymupdf4llm | Engine | RAG-friendly markdown |
| **pdfplumber** | pdfplumber | Engine | Tables & grids on digital PDFs |
| **pdfminer.six** | pdfminer.six | Engine | Low-level text analysis |
| **pypdf** | pypdf | Engine | Page-level text, PDF manipulation |
| **MarkItDown** | markitdown | Engine | Multi-format → markdown |
| **Docling** | docling | Document AI | Layout + tables + formulas + OCR (IBM) |
| **Marker** | marker-pdf | Document AI | High-quality markdown |
| **MinerU** | mineru | Document AI | Strong Korean extraction, balanced layout/OCR |
| **Unstructured** | unstructured | Document AI | Fine-grained elements for ETL/RAG |
| **Camelot** | camelot-py | Tables | Lattice/stream table extraction |
| **Tabula** | tabula-py | Tables | Java-based table extraction |
| **PaddleOCR** | paddleocr | OCR | Strong multilingual OCR |
| **OCRmyPDF** | ocrmypdf | OCR | Tesseract-based searchable PDFs |
| **EasyOCR** | easyocr | OCR | Handwriting-friendly OCR |
| **olmOCR** | olmocr | OCR (VLM) | GPU + vLLM vision OCR |
| **OpenAI Vision** | openai | VLM (cloud) | GPT Vision — layout + text |
| **Claude Vision** | anthropic | VLM (cloud) | Claude Vision — fine block splitting |
| **Gemini Vision** | google-generativeai | VLM (cloud) | Google Gemini vision |
| **Ollama Vision** | ollama | VLM (local) | Free local vision model |
| **OpenDataLoader** | opendataloader-pdf | Specialized | English digital PDFs |

Cloud vision parsers (OpenAI / Claude / Gemini) require your own API key, set in
the app's Settings. All other parsers run locally.

## License & credits

ParserTry orchestrates many third-party parsers; each remains under its own
license (PyMuPDF AGPL, pdfplumber MIT, Docling/Marker/MinerU, PaddleOCR, etc.).
Please review the license of any parser before commercial use. ParserTry itself
is provided as-is for evaluation and comparison.
