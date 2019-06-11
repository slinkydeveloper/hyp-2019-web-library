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
                },
                {
                    model: model.Book,
                    as: 'Related'
                },
                {
                    model: model.Bookevent,
                    as: 'BookEvent'
                }
            ],
            validate: false
        }
    );
}

function addRelated(related) {
    return model.RelatedBook.bulkCreate(related);
}

async function start() {
    await addBook({
        isbn: "9780007322602",
        name: "The Hobbit",
        Genre: {
            "name": "Romance"
        },
        Theme: {
            "name": "Fantasy"
        },
        Author: {
            "name": "J. R. R. Tolkien"
        }
    });
    await addBook({
        isbn: "9780765342294",
        name: "Ender's Game",
        Genre: {
            "name": "Romance"
        },
        Theme: {
            "name": "Fantasy"
        },
        Author: {
            "name": "Orson Scott Card"
        },
        BookEvent: {
            "location": "Politecnico di Milano",
            "presenter": "Orson Scott Card",
            "date": "2019-04-14"
        }
    });
    await addBook({
        isbn: "9781558522763",
        name: "Delegate for Results",
        Genre: {
            "name": "Thesis"
        },
        Theme: {
            "name": "Management"
        },
        Author: {
            "name": "National Press Publications, Inc."
        }
    });
    await addBook({
        isbn: "9781550287912",
        name: "Fighting",
        Genre: {
            "name": "Romance"
        },
        Theme: {
            "name": "Juvanile literature"
        },
        Author: {
            "name": "Elaine Slavens"
        }
    });
    await addBook({
        isbn: "9780881339468",
        name: "Descartes to Kant",
        Genre: {
            "name": "Paper"
        },
        Theme: {
            "name": "Juvanile literature"
        },
        Author: {
            "name": "Garrett Thomson"
        }
    });
    await addBook({
        isbn: "9780740771132",
        name: "Cool Jew",
        Genre: {
            "name": "Literature"
        },
        Theme: {
            "name": "Religion"
        },
        Author: {
            "name": "Lisa Alcalay Klug"
        }
    });
    await addBook({
        isbn: "9780613057660",
        name: "Red Badge of Courage",
        Genre: {
            "name": "Literature"
        },
        Theme: {
            "name": "History"
        },
        Author: {
            "name": "Michael Burgan"
        }
    });
    await addBook({
        isbn: "9780791057957",
        name: "Sheryl Swoopes",
        Genre: {
            "name": "Literature"
        },
        Theme: {
            "name": "Sport"
        },
        Author: {
            "name": "Michael Burgan"
        }
    });
    await addRelated([
        {
            "book_id_1": "9780007322602",
            "book_id_2": "9780765342294"
        },
        {
            "book_id_1": "9780613057660",
            "book_id_2": "9780791057957"
        }
    ]);
}

start().then(res => {
    console.log("Added books!");
    process.exit(0)
}, console.error);