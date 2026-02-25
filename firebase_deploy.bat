@echo off
echo Running build... > deploy_log.txt
call npm run build >> deploy_log.txt 2>&1
echo --- >> deploy_log.txt
echo Running Firebase deploy... >> deploy_log.txt
npx firebase-tools deploy --only hosting >> deploy_log.txt 2>&1
