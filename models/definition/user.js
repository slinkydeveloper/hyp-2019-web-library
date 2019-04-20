/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        username: {
            type: DataTypes.STRING(100),
            field: 'username',
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.CHAR(64),
            field: 'password',
            allowNull: false
        }
    }, {
        schema: 'library',
        tableName: 'user',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const User = model.User;
    const Order = model.Order;
    const Reservation = model.Reservation;

    User.hasMany(Order, {
        as: 'OrderUserIdFkeys',
        foreignKey: 'user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    User.hasMany(Reservation, {
        as: 'ReservationUserIdFkeys',
        foreignKey: 'user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
