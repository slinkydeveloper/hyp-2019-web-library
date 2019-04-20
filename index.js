const fs = require("fs");
const express = require("express");
const { OpenApiValidator } = require("express-openapi-validate/dist/index");
const jsYaml = require("js-yaml");
const Sequelize = require('sequelize');
const config = require('./config/config.js');
const sequelize = new Sequelize(config.db.url);
require('./models/index.js').init(sequelize);
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

sequelize.sync();

//TODO reorder shit

const openApiDocument = jsYaml.safeLoad(
    fs.readFileSync("openapi.yaml", "utf-8")
);
const validator = new OpenApiValidator(openApiDocument);

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Mount Spec
app.get('/backend/spec.yaml', (req, res) => res.sendFile(__dirname + '/openapi.yaml'));
// Mount backend docs and stuff
app.get('/backend/main.html', (req, res) => res.redirect('/backend')); // Redirect main.html to index.html
app.use('/backend', express.static('backend_public'));

app.use(session({
    store: new (require('connect-pg-simple')(session))({
        conString: config.db.url,
        schemaName: 'library'
    }),
    secret: "my super secret",
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

// Mount api paths
require('./paths/books')(app, validator);
require('./paths/users')(app, validator);
require('./paths/orders')(app, validator);
require('./paths/reservations')(app, validator);
require('./paths/bookevents')(app, validator);
require('./paths/authors')(app, validator);
require('./paths/genres')(app, validator);
require('./paths/themes')(app, validator);

app.post('/contact', validator.validate('post', '/contact'), (req, res) => {
    fs.writeFile(__dirname + "/received_contacts/" + Date.now() + ".json", JSON.stringify(req.body), console.error);
    res.status(200).end();
});

app.use('/', express.static('dist'));

// Fallback error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err);
    res.status(statusCode).json({
        error: {
            name: err.name,
            message: err.message,
            data: err.data,
        },
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on", server.address());
});
