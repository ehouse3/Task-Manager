# Docker

Spring backend and postgresql db are both inside docker

# Spring

cd .\spring-backend\taskmanager\; .\mvnw spring-boot:run;

<!-- curl.exe -i -X POST "http://localhost:8080" -->

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


