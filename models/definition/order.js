/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Order', {
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
        tableName: 'order',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Order = model.Order;
    const Orderbook = model.Orderbook;
    const User = model.User;
    const Book = model.Book;

    Order.hasMany(Orderbook, {
        as: 'BookOrderIdFkeys',
        foreignKey: 'order_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Order.belongsTo(User, {
        as: 'User',
        foreignKey: 'user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Order.belongsToMany(Book, {
        as: 'OrderbookBookIsbns',
        through: Orderbook,
        foreignKey: 'order_id',
        otherKey: 'book_isbn',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
