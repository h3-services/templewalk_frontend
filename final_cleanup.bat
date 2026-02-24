@echo off
git reset --soft HEAD~1 > final_fix_log.txt 2>&1
git rm --cached .firebase/hosting.ZGlzdA.cache >> final_fix_log.txt 2>&1
git commit -m "chore: remove unwanted files and update components" >> final_fix_log.txt 2>&1
git push origin DFW --force >> final_fix_log.txt 2>&1
del del_log.txt fix.bat fix_log.txt recover.bat reset_log.txt verify.bat cleanup.bat cleanup_log.txt commit_log.txt diff_volunteers.txt final_push.bat log_check.bat log_check.txt push_log.txt push_test.bat test_write.txt >> final_fix_log.txt 2>&1
