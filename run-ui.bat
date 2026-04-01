@echo off
setlocal

cd /d "%~dp0"

set "PYTHON_EXE=C:\Users\ACer\AppData\Local\Programs\Python\Python314\python.exe"
if not exist "%PYTHON_EXE%" set "PYTHON_EXE=python"

echo Starting local server at http://127.0.0.1:5500
echo Keep the server window open while viewing the UI.

start "Realstate Local Server" cmd /k ""%PYTHON_EXE%" -m http.server 5500"
timeout /t 2 >nul
start "" http://127.0.0.1:5500
