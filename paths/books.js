const model = require('../models/index.js')
const _ = require('lodash')

module.exports = (app, validator) => {

    app.get('/book/:bookId', validator.validate('get', '/book/{bookId}'), (req, res, next) => {
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
                }
            ]
        }).then(
            book =>
                _.isNull(book) || _.isUndefined(book) ?
                    res.status(404).end() :
                    res.json(_.pick(book.toJSON(), ['isbn', 'name', 'Author', 'Theme', 'Genre', 'BookEvent'])),
            res.next
        );
    })

};