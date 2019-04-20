/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Orderbook', {
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
        orderId: {
            type: DataTypes.INTEGER,
            field: 'order_id',
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'order',
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
        tableName: 'orderbook',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Orderbook = model.Orderbook;
    const Book = model.Book;
    const Order = model.Order;

    Orderbook.belongsTo(Book, {
        as: 'RelatedBookIsbn',
        foreignKey: 'book_isbn',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Orderbook.belongsTo(Order, {
        as: 'Order',
        foreignKey: 'order_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
