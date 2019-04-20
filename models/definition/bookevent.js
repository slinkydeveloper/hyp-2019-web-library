/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Bookevent', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        location: {
            type: DataTypes.STRING(200),
            field: 'location',
            allowNull: false
        },
        presenter: {
            type: DataTypes.STRING(200),
            field: 'presenter',
            allowNull: false
        }
    }, {
        schema: 'library',
        tableName: 'bookevent',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Bookevent = model.Bookevent;
    const Book = model.Book;

    Bookevent.hasOne(Book, {
        as: 'BookBookEventFkeys',
        foreignKey: 'book_event',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
