/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Genre', {
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

    Genre.belongsToMany(Author, {
        as: 'BookAuthors',
        through: Book,
        foreignKey: 'genre_id',
        otherKey: 'author_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Genre.belongsToMany(Bookevent, {
        as: 'BookBookEvents',
        through: Book,
        foreignKey: 'genre_id',
        otherKey: 'book_event',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Genre.belongsToMany(Theme, {
        as: 'BookThemes',
        through: Book,
        foreignKey: 'genre_id',
        otherKey: 'theme_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
