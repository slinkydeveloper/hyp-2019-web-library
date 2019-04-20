const model = require('../models/index.js');
const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (app, validator) => {

    app.get('/genre/:genreId', validator.validate('get', '/genre/{genreId}'), (req, res, next) => {
        model.Genre.findByPk(req.params.genreId).then(
            genre =>
                _.isNull(genre) || _.isUndefined(genre) ?
                    res.status(404).end() :
                    res.json(genre.toSimpleJSON()),
            next
        );
    });

    app.get('/genre', (req, res, next) => {
        model.Genre.findAll()
            .then(genres => res.json(
                _.chain(genres)
                    .map(e => e.toSimpleJSON())
                    .values()
            ), next)
    });

};