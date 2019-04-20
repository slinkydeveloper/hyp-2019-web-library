/* eslint new-cap: "off", global-require: "off" */
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
    let Bookevent = sequelize.define('Bookevent', {
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
        },
        date: {
            type: DataTypes.DATEONLY,
            field: 'date',
            allowNull: false
        }
    }, {
        schema: 'library',
        tableName: 'bookevent',
        timestamps: false
    });

    Bookevent.prototype.toSimpleJSON = function() {
        return _.pick(this.toJSON(), ['id', 'location', 'presenter', 'date'])
    };

    Bookevent.prototype.toExpandedJSON = function() {
        return _.pick(this.toJSON(), ['id', 'location', 'presenter', 'date', 'Book'])
    };

    return Bookevent;
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Bookevent = model.Bookevent;
    const Book = model.Book;

    Bookevent.hasOne(Book, {
        as: 'Book',
        foreignKey: 'book_event',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
