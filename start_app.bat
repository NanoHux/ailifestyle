@echo off
echo Starting Backend server...
start "AI Lifestyle Server" cmd /k "cd server && npm run dev"

timeout /t 5

echo Starting Frontend client...
start "AI Lifestyle Client" cmd /k "cd client && npm run dev"

echo.
echo Application started!
echo Backend running at http://localhost:3000
echo Frontend running at http://localhost:5173
echo.
echo Please wait for the browser to open or visit http://localhost:5173 manually.