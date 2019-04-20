/* eslint new-cap: "off", global-require: "off" */
const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
    let Theme = sequelize.define('Theme', {
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
        tableName: 'theme',
        timestamps: false
    });

    Theme.prototype.toSimpleJSON = function() {
        return _.pick(this.toJSON(), ['id', 'name'])
    };

    return Theme;
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Theme = model.Theme;
    const Book = model.Book;
    const Author = model.Author;
    const Bookevent = model.Bookevent;
    const Genre = model.Genre;

    Theme.hasMany(Book, {
        as: 'BookThemeIdFkeys',
        foreignKey: 'theme_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
