@echo off
cd /d c:\Hope3\DFW
echo Initializing Git repository...
git init

echo Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/h3-services/templewalk_frontend_admin.git

echo Switching to DFW branch...
git checkout -b DFW 2>nul || git checkout DFW

echo Staging files...
git add .

echo Committing changes...
git commit -m "Update Guide Creation for DFW"

echo Pushing to remote DFW branch (Forcing update)...
git push -f origin DFW

echo Done.
pause
