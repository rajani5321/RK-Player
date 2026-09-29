@echo off
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
cd /d "C:\RK Player Website"
echo ========================================================
echo   Pushing RK Player to GitHub (rajani5321/RK-Player)...
echo ========================================================
echo.
git branch -M main
git push -u origin main
echo.
echo ========================================================
echo   Finished! Press any key to exit.
echo ========================================================
pause
