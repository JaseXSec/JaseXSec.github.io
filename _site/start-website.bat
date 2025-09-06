@echo off
echo Starting Jekyll website...
echo.

REM Add Ruby to PATH
set PATH=%PATH%;C:\Ruby33-x64\bin

REM Navigate to project directory
cd /d "C:\Users\jasej\Desktop\Portfolio website"

REM Start Jekyll server
echo Starting server at http://127.0.0.1:4000/
echo Press Ctrl+C to stop the server
echo.
bundle exec jekyll serve --host 127.0.0.1 --port 4000

pause
