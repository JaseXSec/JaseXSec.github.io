@echo off
echo Simple Obsidian to Jekyll Converter
echo ===================================
echo.

set /p INPUT_FILE="Enter the path to your Obsidian .md file: "
set /p POST_NAME="Enter the post folder name (for images): "

echo.
echo Converting images in your markdown file...
echo.

REM Create a simple find and replace using PowerShell
powershell -Command "(Get-Content '%INPUT_FILE%') -replace '!\[\[([^\]]+\.(png|jpg|jpeg|gif|svg))\]\]', '![Image Description]({{ ''/assets/images/%POST_NAME%/$1'' | relative_url }})' | Set-Content '%INPUT_FILE%-jekyll.md'"

echo.
echo ✅ Conversion complete!
echo 📁 Input file: %INPUT_FILE%
echo 📁 Output file: %INPUT_FILE%-jekyll.md
echo 📁 Images should be copied to: assets/images/%POST_NAME%/
echo.
echo Next steps:
echo 1. Copy the output file to _posts/ with proper naming (YYYY-MM-DD-title.md)
echo 2. Copy images to assets/images/%POST_NAME%/
echo 3. Test your post on the website!
echo.
pause
