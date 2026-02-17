@echo off
echo Setting remote for user kiruthika3811...
git remote set-url origin https://kiruthika3811@github.com/h3-services/templewalk_frontend_admin.git

echo Pushing to DFW branch...
echo -----------------------------------------------------------------------
echo NOTE: When prompted for a password, please enter your GitHub Personal Access Token (PAT).
echo GitHub passwords are no longer supported for command line use.
echo -----------------------------------------------------------------------
git push -u origin DFW
pause
