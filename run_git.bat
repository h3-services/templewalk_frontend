@echo off
echo Starting git process... > git_result.log
git add . >> git_result.log 2>&1
echo Done adding. >> git_result.log
git commit -m "Update code for DFW branch" >> git_result.log 2>&1
echo Committed. >> git_result.log
git push https://github.com/h3-services/templewalk_frontend_admin.git master:DFW >> git_result.log 2>&1
echo Finished push. >> git_result.log
