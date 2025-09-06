@echo off
echo ========================================
echo    GitHub Pages Setup Helper
echo ========================================
echo.

echo This script will help you set up GitHub Pages deployment.
echo.

echo STEP 1: Create GitHub Repository
echo ================================
echo 1. Go to https://github.com/new
echo 2. Repository name: yourusername.github.io
echo 3. Description: Cybersecurity Portfolio Website
echo 4. Set to Public
echo 5. Don't initialize with README
echo 6. Click "Create repository"
echo.

echo STEP 2: Get Your Repository URL
echo ===============================
set /p REPO_URL="Enter your repository URL (e.g., https://github.com/yourusername/yourusername.github.io.git): "

echo.
echo STEP 3: Initialize Git and Push Code
echo ====================================
echo.

echo Initializing git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit - Jekyll portfolio"

echo Adding remote repository...
git remote add origin %REPO_URL%

echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo    SUCCESS! 
    echo ========================================
    echo.
    echo Your code has been pushed to GitHub!
    echo.
    echo NEXT STEPS:
    echo 1. Go to your repository on GitHub
    echo 2. Click Settings ^> Pages
    echo 3. Source: Select "GitHub Actions"
    echo 4. Save settings
    echo 5. Wait 2-5 minutes for deployment
    echo 6. Visit your site at: https://yourusername.github.io
    echo.
    echo See GITHUB-PAGES-DEPLOYMENT.md for complete instructions.
    echo.
) else (
    echo.
    echo ========================================
    echo    ERROR!
    echo ========================================
    echo.
    echo There was an error pushing to GitHub.
    echo Check your repository URL and try again.
    echo.
)

echo.
pause
