@echo off
echo --- GIT STATUS ---
git status
echo.
echo --- GIT REMOTE -V ---
git remote -v
echo.
echo --- GIT LOG -1 ---
git log -1
echo.
echo --- ATTEMPTING PUSH WITH STDERR CAPTURE ---
git push origin DFW 2>&1
