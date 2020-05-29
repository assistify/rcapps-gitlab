#!/bin/bash

docker-compose down -v
docker-compose up -d

while ! curl -s http://localhost:3000 > /dev/null
do
  echo "still trying..."
  sleep 10
done

cd ..
rc-apps deploy --url=http://localhost:3000 -u=admin -p=supersecret
npm test

