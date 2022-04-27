#!/usr/bin/env bash

docker compose -p city-api-server up --remove-orphans --build

docker rm $(docker stop $(docker ps -aq))
docker rmi city-api-server_api