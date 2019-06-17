# Hypermedia 2019 project - Francesco Guardiani / Miranda Mucignat

## Prepare your environment

```
npm install
```

## Start Postgres

```
docker-compose up
```

When you start the composition for the first time,
the container will mount `sql` folder as volume and use the scripts inside to initialize
the db schema and data.

If it doesn't work, you are probably experiencing an issue with [SELinux](https://www.projectatomic.io/blog/2015/06/using-volumes-with-docker-can-cause-problems-with-selinux/)

You can temporary disable SELinux using `setenforce Permissive`

## Start server

```
npm start
```

## Directory structure

```
.
├── backend_public # Public directory to host /backend directory
├── config # Configuration file
├── models # Sequelize Models
├── paths # API endpoints
├── public # Public src
├── received_contacts # Received JSON in contact form
├── sql # SQL files
├── utils # Utils

```