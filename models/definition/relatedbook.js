/* eslint new-cap: "off", global-require: "off" */
const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('RelatedBook', {
        book_id_1: {
            type: DataTypes.CHAR(13),
            field: 'book_id_1',
            allowNull: false,
            primaryKey: true
        },
        book_id_2: {
            type: DataTypes.CHAR(13),
            field: 'book_id_2',
            allowNull: false,
            primaryKey: true
        }
    }, {
        schema: 'library',
        tableName: 'relatedbook',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Book = model.Book;
    const Orderbook = model.Orderbook;
    const Reservationbook = model.Reservationbook;
    const Author = model.Author;
    const Bookevent = model.Bookevent;
    const Genre = model.Genre;
    const Theme = model.Theme;
    const Order = model.Order;
    const Reservation = model.Reservation;

};
