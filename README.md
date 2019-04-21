# Hypermedia 2019 project - Francesco Guardiani / Miranda Mucignat

## Prepare your environment

```
npm install
```

## Start Postgres

```
docker-compose up
```

## Start server

```
npm start
```

## Initialize data in DB

```
npm initialize-data
```

## Directory structure

```
.
├── backend_public # Public directory to host /backend directory
├── config # Configuraiton files
├── dist # Public compiled
├── models # Sequelize Models
├── paths # API endpoints
├── public # Public src
├── received_contacts # Received JSON in contact form
├── sql # SQL files
├── utils # Utils

```