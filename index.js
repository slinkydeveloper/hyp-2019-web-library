// const fs = require("fs");
// const express = require("express");
// const { OpenApiValidator } = require("express-openapi-validate/dist/index");
// const jsYaml = require("js-yaml");
//
// const app = express();
// app.use(express.json());
//
// const openApiDocument = jsYaml.safeLoad(
//     fs.readFileSync("openapi.yaml", "utf-8")
// );
// const validator = new OpenApiValidator(openApiDocument);
//
// app.get("/user", validator.validate("get", "/user"), (req, res, next) => {
//     res.json({ hello: "world" });
// });
//
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     res.status(statusCode).json({
//         error: {
//             name: err.name,
//             message: err.message,
//             data: err.data,
//         },
//     });
// });
//
// const server = app.listen(3000, () => {
//     console.log("Listening on", server.address());
// });

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const model = require('./models/index.js').init(sequelize);
