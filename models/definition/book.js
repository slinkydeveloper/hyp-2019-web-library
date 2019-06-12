/* eslint new-cap: "off", global-require: "off" */
const _ = require('lodash');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require('../../config/config.js');

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
        return _.pick(this.toJSON(), ['isbn', 'name', 'Author', 'Theme', 'Genre', 'BookEvent', 'Related'])
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
    const RelatedBook = model.RelatedBook;

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
        as: 'BookEvent',
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

    Book.belongsToMany(Book, {
        as: 'Related',
        through: RelatedBook,
        foreignKey: 'book_id_1',
        otherKey: 'book_id_2'
    });

    Book.filteredBooks = function(author, genre, theme, bestseller, staffpicks) {
        let include = [
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
        ];
        let options = {
            include: include
        };

        if (_.isString(genre)) {
            include[0].where = {id: genre};
        }

        if (_.isString(theme)) {
            include[1].where = {id: theme};
        }
        if (_.isString(author)) {
            include[2].where = {id: author};
        }
        if (_.isBoolean(bestseller) && bestseller) {
            _.set(options, 'where.isbn', config["best-seller"])
        }
        if (_.isBoolean(staffpicks) && staffpicks) {
            _.set(options, 'where.isbn', config["staff-picks"])
        }

        return model.Book.findAll(options);
    };

};
