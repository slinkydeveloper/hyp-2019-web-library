/* eslint new-cap: "off", global-require: "off" */
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
    let Author = sequelize.define('Author', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            field: 'name',
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            field: 'description',
            allowNull: false
        }
    }, {
        schema: 'library',
        tableName: 'author',
        timestamps: false
    });

    Author.prototype.toSimpleJSON = function() {
        return _.pick(this.toJSON(), ['id', 'name', 'description'])
    };

    return Author;
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Author = model.Author;
    const Book = model.Book;
    const Bookevent = model.Bookevent;
    const Genre = model.Genre;
    const Theme = model.Theme;

    Author.hasMany(Book, {
        as: 'BookAuthorIdFkeys',
        foreignKey: 'author_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });
};
