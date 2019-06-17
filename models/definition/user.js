/* eslint new-cap: "off", global-require: "off" */
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING(100),
            field: 'username',
            allowNull: false,
            primaryKey: true
        },
        mail: {
            type: DataTypes.STRING(100),
            field: 'mail',
            allowNull: false
        },
        password: {
            type: DataTypes.CHAR(128),
            field: 'password',
            allowNull: false
        }
    }, {
        schema: 'library',
        tableName: 'user',
        timestamps: false
    });

    User.loginUser = function(usernameOrMail, hashedPassword) {
        return User.findOne({
            where: {
                [Op.and]: {
                    [Op.or]: [
                        { username: usernameOrMail },
                        { mail: usernameOrMail }
                    ],
                    password: hashedPassword
                }
            }
        })
    };

    User.prototype.toSimpleJSON = function() {
        return _.pick(this.toJSON(), ['mail', 'username'])
    };

    User.prototype.toExpandedJSON = function() {
        return _.pick(this.toJSON(), ['mail', 'username', 'Orders', 'Reservations'])
    };

    return User;
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const User = model.User;
    const Order = model.Order;
    const Reservation = model.Reservation;

    User.hasMany(Order, {
        as: 'Orders',
        foreignKey: 'username',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    User.hasMany(Reservation, {
        as: 'Reservations',
        foreignKey: 'username',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
