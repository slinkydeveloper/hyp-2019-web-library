const model = require('../models/index.js');
const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (app, validator) => {

    app.get('/bookEvent/:bookEventId', validator.validate('get', '/bookEvent/{bookEventId}'), (req, res, next) => {
        let bookEventId = req.params.bookEventId;
        model.Bookevent.findByPk(bookEventId, {
            include: [
                {
                    model: model.Book,
                    as: 'Book'
                }
            ]
        }).then(
            bookEvent =>
                _.isNull(bookEvent) || _.isUndefined(bookEvent) ?
                    res.status(404).end() :
                    res.json(bookEvent.toExpandedJSON()),
            next
        );
    });

    app.get('/bookEvent', (req, res, next) => {
        let query = {};
        if (_.has(req.query, 'from') && _.has(req.query, 'to')) {
            query = {
                where: {
                    date: {[Op.between]: [new Date(req.query.from), new Date(req.query.to)]}
                }
            }
        } else if (_.has(req.query, 'from')) {
            query = {
                where: {date: {[Op.gte]: new Date(req.query.from)}}
            }
        } else if (_.has(req.query, 'to')) {
            query = {
                where: {date: {[Op.lte]: new Date(req.query.to)}}
            }
        }
        model.Bookevent.findAll(query)
            .then(bEvents => res.json(
                _.chain(bEvents)
                    .map(e => e.toSimpleJSON())
                    .values()
            ), next)
    });

};