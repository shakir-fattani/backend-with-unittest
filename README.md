# backend-with-unittest

### To run application in container.
```
cd docker-container
./start-container.sh

```


### To load data in MongoDB from TSV data file
```
docker exec -it city-api-server-api-1 bash
node bin/import-data.js
```

### for linting 
```
npm run style
```

### for linting with auto-fixing
```
npm run style-fix
```
