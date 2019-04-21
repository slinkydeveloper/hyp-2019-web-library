const model = require('../models/index.js');
const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (app, validator) => {

    app.get('/api/theme/:themeId', validator.validate('get', '/theme/{themeId}'), (req, res, next) => {
        model.Theme.findByPk(req.params.themeId).then(
            theme =>
                _.isNull(theme) || _.isUndefined(theme) ?
                    res.status(404).end() :
                    res.json(theme.toSimpleJSON()),
            next
        );
    });

    app.get('/api/theme', (req, res, next) => {
        model.Theme.findAll()
            .then(themes => res.json(
                _.chain(themes)
                    .map(e => e.toSimpleJSON())
                    .values()
            ), next)
    });

};