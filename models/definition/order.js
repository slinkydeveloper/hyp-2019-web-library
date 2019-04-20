/* eslint new-cap: "off", global-require: "off" */
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
    let Order = sequelize.define('Order', {
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
        tableName: 'order',
        timestamps: false
    });

    Order.prototype.toExpandedJSON = function() {
        return {
            id: this.id,
            username: this.username,
            Books: _.map(this.OrderBooks, (val) => {
                return {
                    isbn: val.bookIsbn,
                    quantity: val.quantity,
                    name: val.RelatedBookIsbn.name
                }
            })
        };
    };

    return Order;
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Order = model.Order;
    const Orderbook = model.Orderbook;
    const User = model.User;
    const Book = model.Book;

    Order.hasMany(Orderbook, {
        as: 'OrderBooks',
        foreignKey: 'order_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Order.belongsTo(User, {
        as: 'User',
        foreignKey: 'username',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Order.belongsToMany(Book, {
        as: 'Books',
        through: Orderbook,
        foreignKey: 'order_id',
        otherKey: 'book_isbn',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Order.getOrder = function(id) {
        return Order.findByPk(id, {
            include: [
                {
                    model: Orderbook,
                    as: 'OrderBooks',
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

    Order.addOrder = function(username, books) {
        return Order.create({username: username})
            .then(order =>
                Promise.all([order, Orderbook.bulkCreate(
                    _.map(books, (quantity, isbn) => ({
                        orderId: order.id,
                        bookIsbn: isbn,
                        quantity: quantity
                    }))
                )
            ])).then(r => r[0]);
    }

};
