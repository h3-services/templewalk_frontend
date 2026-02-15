@echo off
echo Initializing Git...
if not exist .git (
    git init
)
echo Configuring remote...
git remote remove origin 2>nul
git remote add origin https://github.com/h3-services/templewalk_frontend_admin.git

echo Fetching...
git fetch origin

echo Checking out DFW...
git checkout -B DFW

echo Staging...
git add .

echo Committing...
git commit -m "Update Guide Creation for DFW"

echo Pushing...
git push -f -u origin DFW

echo Done.
