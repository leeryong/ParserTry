@echo off
REM ParserTry launcher (Windows). Installs on first run, then starts.
cd /d "%~dp0"
if not exist ".venv" (
  echo First run - installing...
  py install.py || python install.py
)
".venv\Scripts\python.exe" run.py %*
pause
