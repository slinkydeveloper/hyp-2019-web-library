/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Author', {
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
        tableName: 'author',
        timestamps: false
    });
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

    Author.belongsToMany(Bookevent, {
        as: 'BookBookEvents',
        through: Book,
        foreignKey: 'author_id',
        otherKey: 'book_event',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Author.belongsToMany(Genre, {
        as: 'BookGenres',
        through: Book,
        foreignKey: 'author_id',
        otherKey: 'genre_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Author.belongsToMany(Theme, {
        as: 'BookThemes',
        through: Book,
        foreignKey: 'author_id',
        otherKey: 'theme_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
