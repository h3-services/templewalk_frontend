@echo off
git remote -v > remote_info.txt
git status > status_info.txt
git push origin DFW > push_output.txt 2>&1
