#!/usr/bin/env bash

docker compose -p city-api-server --profile api up --remove-orphans --build
docker compose -p city-api-server --profile api down --remove-orphans -v

docker rmi city-api-server_api