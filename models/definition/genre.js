/* eslint new-cap: "off", global-require: "off" */
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
    let Genre = sequelize.define('Genre', {
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
        }
    }, {
        schema: 'library',
        tableName: 'genre',
        timestamps: false
    });

    Genre.prototype.toSimpleJSON = function() {
        return _.pick(this.toJSON(), ['id', 'name'])
    };

    return Genre;
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Genre = model.Genre;
    const Book = model.Book;
    const Author = model.Author;
    const Bookevent = model.Bookevent;
    const Theme = model.Theme;

    Genre.hasMany(Book, {
        as: 'BookGenreIdFkeys',
        foreignKey: 'genre_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
