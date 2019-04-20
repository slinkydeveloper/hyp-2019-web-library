/* eslint new-cap: "off", global-require: "off" */
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
    let Reservation = sequelize.define('Reservation', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(100),
            field: 'username',
            allowNull: false,
            references: {
                model: 'user',
                key: 'username'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        }
    }, {
        schema: 'library',
        tableName: 'reservation',
        timestamps: false
    });

    Reservation.prototype.toExpandedJSON = function() {
        return {
            id: this.id,
            username: this.username,
            Books: _.map(this.ReservationBooks, (val) => {
                return {
                    isbn: val.bookIsbn,
                    quantity: val.quantity,
                    name: val.RelatedBookIsbn.name
                }
            })
        };
    };

    return Reservation;
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Reservation = model.Reservation;
    const Reservationbook = model.Reservationbook;
    const User = model.User;
    const Book = model.Book;

    Reservation.hasMany(Reservationbook, {
        as: 'ReservationBooks',
        foreignKey: 'reservation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Reservation.belongsTo(User, {
        as: 'User',
        foreignKey: 'username',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Reservation.belongsToMany(Book, {
        as: 'Books',
        through: Reservationbook,
        foreignKey: 'reservation_id',
        otherKey: 'book_isbn',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Reservation.getReservation = function(id) {
        return Reservation.findByPk(id, {
            include: [
                {
                    model: Reservationbook,
                    as: 'ReservationBooks',
                    include: [
                        {
                            model: Book,
                            as: 'RelatedBookIsbn'
                        }
                    ]
                }
            ]
        })
    };

    Reservation.addReservation = function(username, books) {
        return Reservation.create({username: username})
            .then(reservation =>
                Promise.all([reservation, Reservationbook.bulkCreate(
                    _.map(books, (quantity, isbn) => ({
                        reservationId: reservation.id,
                        bookIsbn: isbn,
                        quantity: quantity
                    }))
                )
                ])).then(r => r[0]);
    }

};
