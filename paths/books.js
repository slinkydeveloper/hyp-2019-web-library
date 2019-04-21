const model = require('../models/index.js');
const _ = require('lodash');
const config = require('../config/config.js');

module.exports = (app, validator) => {

    app.get('/api/book/:bookId', validator.validate('get', '/book/{bookId}'), (req, res, next) => {
        let bookId = req.params.bookId;
        model.Book.findByPk(bookId, {
            include: [
                {
                    model: model.Genre,
                    as: 'Genre'
                },
                {
                    model: model.Theme,
                    as: 'Theme'
                },
                {
                    model: model.Author,
                    as: 'Author'
                },
                {
                    model: model.Book,
                    as: 'Related',
                    attributes: ['isbn', 'name']
                }
            ]
        }).then(
            book =>
                _.isNull(book) || _.isUndefined(book) ?
                    res.status(404).end() :
                    res.json(book.toExpandedJSON()),
            next
        );
    });

    app.get('/api/book/best-seller', (req, res, next) => {
        model.Book.findAll({where:{isbn: config["best-seller"]}})
            .then(books => res.json(
                _.chain(books.toJSON())
                    .map(b => b.toSimpleJSON())
                    .values()
            ), next)
    });

    app.get('/api/book/staff-picks', (req, res, next) => {
        model.Book.findAll({where:{isbn: config["staff-picks"]}})
            .then(books => res.json(
                _.chain(books.toJSON())
                    .map(b => b.toSimpleJSON())
                    .values()
            ), next)
    });

    app.get('/api/book', validator.validate('get', '/book'), (req, res, next) => {
        model.Book.filteredBooks(_.get(req, 'query.author'), _.get(req, 'query.genre'), _.get(req, 'query.theme'))
            .then(books => res.json(
                _.chain(books)
                    .map(b => b.toSimpleJSON())
                    .values()
            ), next)
    });

};