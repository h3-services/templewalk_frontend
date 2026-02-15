@echo off
git init
git remote remove origin
git remote add origin https://github.com/h3-services/templewalk_frontend_admin.git
git fetch origin
git checkout -B DFW
git add .
git commit -m "Update Guide Creation for DFW"
git push -u origin DFW
