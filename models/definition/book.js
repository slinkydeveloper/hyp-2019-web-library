/* eslint new-cap: "off", global-require: "off" */
const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
    let Book = sequelize.define('Book', {
        isbn: {
            type: DataTypes.CHAR(13),
            field: 'isbn',
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            field: 'name',
            allowNull: false
        },
        authorId: {
            type: DataTypes.INTEGER,
            field: 'author_id',
            allowNull: false,
            references: {
                model: 'author',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        genreId: {
            type: DataTypes.INTEGER,
            field: 'genre_id',
            allowNull: false,
            references: {
                model: 'genre',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        themeId: {
            type: DataTypes.INTEGER,
            field: 'theme_id',
            allowNull: false,
            references: {
                model: 'theme',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        bookEvent: {
            type: DataTypes.INTEGER,
            field: 'book_event',
            allowNull: true,
            references: {
                model: 'bookevent',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'library',
        tableName: 'book',
        timestamps: false
    });

    Book.prototype.toExpandedJSON = function() {
        return _.pick(this.toJSON(), ['isbn', 'name', 'Author', 'Theme', 'Genre', 'BookEvent'])
    };

    Book.prototype.toSimpleJSON = function() {
        return _.pick(this.toJSON(), ['isbn', 'name'])
    };

    return Book;
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

    Book.hasMany(Orderbook, {
        as: 'OrderbookBookIsbnFkeys',
        foreignKey: 'book_isbn',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Book.hasMany(Reservationbook, {
        as: 'ReservationbookBookIsbnFkeys',
        foreignKey: 'book_isbn',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Book.belongsTo(Author, {
        as: 'Author',
        foreignKey: 'author_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Book.belongsTo(Bookevent, {
        as: 'RelatedBookEvent',
        foreignKey: 'book_event',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Book.belongsTo(Genre, {
        as: 'Genre',
        foreignKey: 'genre_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Book.belongsTo(Theme, {
        as: 'Theme',
        foreignKey: 'theme_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Book.belongsToMany(Order, {
        as: 'OrderbookOrders',
        through: Orderbook,
        foreignKey: 'book_isbn',
        otherKey: 'order_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Book.belongsToMany(Reservation, {
        as: 'ReservationbookReservations',
        through: Reservationbook,
        foreignKey: 'book_isbn',
        otherKey: 'reservation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Book.filteredBooks = function(author, genre, theme) {
        let includes = [];
        if (_.isString(author)) {
            includes.push({
                model: Author,
                as: 'Author',
                where: {id: author}
            })
        }

        if (_.isString(genre)) {
            includes.push({
                model: Genre,
                as: 'Genre',
                where: {id: genre}
            })
        }

        if (_.isString(theme)) {
            includes.push({
                model: Theme,
                as: 'Theme',
                where: {id: theme}
            })
        }

        return model.Book.findAll({include: includes});
    };

};
