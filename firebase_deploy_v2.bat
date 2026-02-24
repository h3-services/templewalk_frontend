@echo off
echo Running Firebase deploy... > deploy_log_v2.txt
npx -y firebase-tools deploy --only hosting --non-interactive --project poetic-archway-486415-r8 >> deploy_log_v2.txt 2>&1
