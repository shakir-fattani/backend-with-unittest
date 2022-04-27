#!/usr/bin/env bash

docker compose -p city-api-server up --remove-orphans --build
docker compose -p city-api-server down --remove-orphans -v

docker rmi city-api-server_api