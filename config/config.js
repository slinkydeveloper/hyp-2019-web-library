let conf = {
  "db": {
    "username": "postgres",
    "password": "postgres",
    "database": "library",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  },
  "best-seller": [
    "9780373194780",
    "9780553384512"
  ],
  "staff-picks": [
    "9780758210531",
    "9780613057660"
  ]
};

conf.db.url = process.env.DATABASE_URL || "postgres://" + conf.db.username + ":" + conf.db.password + "@" + conf.db.host + ":" + conf.db.port + "/" + conf.db.database;

module.exports = conf;
