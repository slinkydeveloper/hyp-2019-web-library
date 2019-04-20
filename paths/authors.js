const model = require('../models/index.js');
const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (app, validator) => {

    app.get('/author/:authorId', validator.validate('get', '/author/{authorId}'), (req, res, next) => {
        model.Author.findByPk(req.params.authorId).then(
            author =>
                _.isNull(author) || _.isUndefined(author) ?
                    res.status(404).end() :
                    res.json(author.toSimpleJSON()),
            next
        );
    });

    app.get('/author', (req, res, next) => {
        model.Author.findAll()
            .then(authors => res.json(
                _.chain(authors)
                    .map(e => e.toSimpleJSON())
                    .values()
            ), next)
    });

};