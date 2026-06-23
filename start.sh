#!/usr/bin/env bash
# ParserTry launcher (macOS / Linux). Installs on first run, then starts.
cd "$(dirname "$0")"
if [ ! -d ".venv" ]; then
  echo "First run — installing..."
  python3 install.py || { echo "Install failed. See INSTALL.md"; exit 1; }
fi
exec .venv/bin/python run.py "$@"
