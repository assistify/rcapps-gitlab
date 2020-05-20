@echo off

docker-compose down -v
docker-compose up -d

:while 
curl http://localhost:3000 > nul 2> nul

if %ERRORLEVEL% NEQ 0 (
  echo still trying...
  ping 127.0.0.1 -n 10 > nul 2> nul
  goto :while
)

cd ..
call rc-apps deploy --url=http://localhost:3000 -u=admin -p=supersecret
cd test
cd app
npm test

