@echo off
echo ========================================
echo   Florida Sign Solution - GitHub Pages
echo   Deployment Script
echo ========================================
echo.

echo [1/5] Backing up local development files...
if exist index.html ren index.html index-local.html
if exist script.js ren script.js script-local.js
echo ✅ Local files backed up

echo.
echo [2/5] Setting up GitHub Pages files...
if exist index-github.html (
    ren index-github.html index.html
    echo ✅ index-github.html → index.html
) else (
    echo ❌ index-github.html not found!
    pause
    exit /b 1
)

if exist script-github.js (
    ren script-github.js script.js
    echo ✅ script-github.js → script.js
) else (
    echo ❌ script-github.js not found!
    pause
    exit /b 1
)

echo.
echo [3/5] Checking EmailJS configuration...
findstr /C:"service_xxxxxxx" script.js >nul
if %errorlevel%==0 (
    echo ⚠️  WARNING: EmailJS not configured yet!
    echo    Please update script.js with your EmailJS IDs
    echo    See EMAILJS-SETUP-GUIDE.md for instructions
) else (
    echo ✅ EmailJS appears to be configured
)

echo.
echo [4/5] Adding files to git...
git add .
if %errorlevel%==0 (
    echo ✅ Files added to git
) else (
    echo ❌ Git add failed - make sure you're in a git repository
    echo    Run: git init
    pause
    exit /b 1
)

echo.
echo [5/5] Committing changes...
git commit -m "Deploy Florida Sign Solution to GitHub Pages with EmailJS"
if %errorlevel%==0 (
    echo ✅ Changes committed
) else (
    echo ⚠️  Commit failed - possibly no changes to commit
)

echo.
echo ========================================
echo   🚀 DEPLOYMENT READY!
echo ========================================
echo.
echo Next steps:
echo 1. Push to GitHub: git push
echo 2. Enable GitHub Pages in repository settings
echo 3. Configure EmailJS (see EMAILJS-SETUP-GUIDE.md)
echo 4. Test your live site!
echo.
echo Your site will be available at:
echo https://YOUR_USERNAME.github.io/REPOSITORY_NAME/
echo.
pause