const fs = require("fs");
const express = require("express");
const { OpenApiValidator } = require("express-openapi-validate/dist/index");
const jsYaml = require("js-yaml");
const Sequelize = require('sequelize');
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
require('./models/index.js').init(sequelize);
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
const cors = require('cors')

//TODO reorder shit

const openApiDocument = jsYaml.safeLoad(
    fs.readFileSync("openapi.yaml", "utf-8")
);
const validator = new OpenApiValidator(openApiDocument);

const app = express();
app.use(cors());
app.use(express.json());

// Mount Spec
app.get('/backend/spec.yaml', (req, res) => res.sendFile(__dirname + '/openapi.yaml'));
// Mount backend docs and stuff
app.get('/backend/main.html', (req, res) => res.redirect('/backend'))
app.use('/backend', express.static('backend_public'));

// Mount api paths
require('./paths/books')(app, validator);

// Fallback error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
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
