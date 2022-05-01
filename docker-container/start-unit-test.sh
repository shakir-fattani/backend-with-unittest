#!/usr/bin/env bash

docker compose -p city-api-server --profile unit-test up --remove-orphans --build --abort-on-container-exit
docker compose -p city-api-server --profile unit-test down --remove-orphans -v

docker rmi city-api-server_api-unit-test