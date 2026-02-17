@echo off
echo Starting build... > deploy.log
call npm run build >> deploy.log 2>&1
echo Build finished. >> deploy.log

echo Starting deploy... >> deploy.log
call npx firebase deploy >> deploy.log 2>&1
echo Deploy finished. >> deploy.log
