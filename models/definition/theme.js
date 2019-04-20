/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Theme', {
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

    Theme.belongsToMany(Author, {
        as: 'BookAuthors',
        through: Book,
        foreignKey: 'theme_id',
        otherKey: 'author_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Theme.belongsToMany(Bookevent, {
        as: 'BookBookEvents',
        through: Book,
        foreignKey: 'theme_id',
        otherKey: 'book_event',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Theme.belongsToMany(Genre, {
        as: 'BookGenres',
        through: Book,
        foreignKey: 'theme_id',
        otherKey: 'genre_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
