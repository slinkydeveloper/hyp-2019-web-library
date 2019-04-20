/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Reservationbook', {
        bookIsbn: {
            type: DataTypes.CHAR(13),
            field: 'book_isbn',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'book',
                key: 'isbn'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        reservationId: {
            type: DataTypes.INTEGER,
            field: 'reservation_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'reservation',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        quantity: {
            type: DataTypes.INTEGER,
            field: 'quantity',
            allowNull: false
        }
    }, {
        schema: 'library',
        tableName: 'reservationbook',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Reservationbook = model.Reservationbook;
    const Book = model.Book;
    const Reservation = model.Reservation;

    Reservationbook.belongsTo(Book, {
        as: 'RelatedBookIsbn',
        foreignKey: 'book_isbn',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Reservationbook.belongsTo(Reservation, {
        as: 'Reservation',
        foreignKey: 'reservation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
