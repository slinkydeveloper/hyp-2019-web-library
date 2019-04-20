/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Reservation', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.STRING(100),
            field: 'user_id',
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
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Reservation = model.Reservation;
    const Reservationbook = model.Reservationbook;
    const User = model.User;
    const Book = model.Book;

    Reservation.hasMany(Reservationbook, {
        as: 'BookReservationIdFkeys',
        foreignKey: 'reservation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Reservation.belongsTo(User, {
        as: 'User',
        foreignKey: 'user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Reservation.belongsToMany(Book, {
        as: 'ReservationbookBookIsbns',
        through: Reservationbook,
        foreignKey: 'reservation_id',
        otherKey: 'book_isbn',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
