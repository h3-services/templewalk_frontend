@echo off
echo Setting remote for user kiruthika3811...
git remote set-url origin https://kiruthika3811@github.com/h3-services/templewalk_frontend_admin.git

echo -----------------------------------------------------------------------
echo WARNING: This will OVERWRITE the remote DFW branch with your local code.
echo Use this only if you are sure your local code is the correct version.
echo -----------------------------------------------------------------------
echo Pushing...

git push -f -u origin DFW

echo Done.
pause
