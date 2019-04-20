const Sequelize = require('sequelize');
const config = require('./config/config.js').db;
const sequelize = new Sequelize(config.url);
const model = require('./models/index.js').init(sequelize);

function addBook(b) {
    return model.Book.create(
        b, {
            include: [
                {
                    model: model.Genre,
                    as: 'Genre'
                },
                {
                    model: model.Theme,
                    as: 'Theme'
                },
                {
                    model: model.Author,
                    as: 'Author'
                }
            ],
            validate: false
        }
    );
}

Promise.all([
    addBook({
        isbn: "9788893814508",
        name: "Harry Potter e la pietra filosofale",
        Genre: {
            "name": "Fantasy"
        },
        Theme: {
            "name": "Wizards"
        },
        Author: {
            "name": "J.K. Rowling"
        }
    }),
    addBook({
        isbn: "9789510394861",
        name: "Dal big bang ai buchi neri. Breve storia del tempo",
        Genre: {
            "name": "Science"
        },
        Theme: {
            "name": "Astrophysics"
        },
        Author: {
            "name": "Stephen Hawking"
        }
    })
]).then(res => {
    console.log("Added books!")
    process.exit(0)
}, console.error);