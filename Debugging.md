# Docker

Spring backend and postgresql db are both inside docker

# Spring

cd .\spring-backend\taskmanager\; docker-compose build app
docker-compose up

<!-- curl.exe -i -X POST "http://localhost:8080" -->

# Spring Debugging

create logger for myservice:
private static final Logger logger = LoggerFactory.getLogger(myservice.class);

then use:
log.debug("");


# Postgres

# Composing docker for spring and database
docker-compose up
docker-compose down -v

# Enter terminal inside docker and db
docker exec -it taskmanager_postgresql psql -U postgres -d taskmanager_db  
\list
\dt

# Nextjs 

cd .\nextjs-frontend\taskmanager\; npm run dev


