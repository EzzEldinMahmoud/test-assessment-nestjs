# Project description
this project is a Product management Application built with nestjs and typeORM and Postgresql database.

## Setup instructions
- first clone the repo 
- cd docker 
- create docker.env file and put these.
    ``` 
        POSTGRES_USER=admin
        POSTGRES_PASSWORD=admin
        POSTGRES_DB=nestjs
        PGADMIN_DEFAULT_EMAIL=admin@admin.com
        PGADMIN_DEFAULT_PASSWORD=admin
    ```
- then 
``` docker compose up```
- now go back and cd to backend folder and type:
 ```cd.. && cd backend && npm install```
- now you need to create .env file for backend folder and type this:
    ```
        ENIVERONMENT=DEV
        POSTGRES_HOST=localhost
        POSTGRES_PORT=5432
        POSTGRES_USER=admin
        POSTGRES_PASSWORD=admin
        POSTGRES_DB=nestjs
        PORT=5000
        JWT_SECRET=nodejstest
        JWT_EXPIRATION_TIME=10000
    ```
- now you can run the application by
    ```npm start``` 

## How to run the tests
```npm test```
- Example	API	usage