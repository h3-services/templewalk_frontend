@echo off
echo Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    exit /b %errorlevel%
)
echo Build successful.

echo Deploying to Firebase...
call npx firebase deploy
if %errorlevel% neq 0 (
    echo Deployment to Firebase failed!
    exit /b %errorlevel%
)
echo Deployment successful!
pause
