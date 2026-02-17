@echo off
echo Building the project...
call npm run build > build_deploy.log 2>&1
if %errorlevel% neq 0 (
    echo Build failed! >> build_deploy.log
    exit /b %errorlevel%
)
echo Build successful. >> build_deploy.log

echo Deploying to Firebase...
call npx firebase deploy >> build_deploy.log 2>&1
if %errorlevel% neq 0 (
    echo Deployment to Firebase failed! >> build_deploy.log
    exit /b %errorlevel%
)
echo Deployment successful! >> build_deploy.log
pause
