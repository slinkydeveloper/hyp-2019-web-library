DROP SCHEMA library CASCADE;

CREATE SCHEMA IF NOT EXISTS library;

CREATE TABLE IF NOT EXISTS library.User (
    username VARCHAR(100) NOT NULL PRIMARY KEY,
    "password" CHAR(64) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS library.Genre (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS library.Theme (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS library.Author (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS library.BookEvent (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    location VARCHAR(200) NOT NULL,
    presenter VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS library.Book (
    isbn CHAR(13) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    author_id INTEGER NOT NULL REFERENCES library.Author(id),
    genre_id INTEGER NOT NULL REFERENCES library.Genre(id),
    theme_id INTEGER NOT NULL REFERENCES library.Theme(id),
    book_event INTEGER REFERENCES library.BookEvent(id)
);

CREATE TABLE IF NOT EXISTS library.Reservation (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL REFERENCES library.User(username)
);

CREATE TABLE IF NOT EXISTS library.Order (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL REFERENCES library.User(username)
);

CREATE TABLE IF NOT EXISTS library.OrderBook (
    book_isbn CHAR(13) NOT NULL REFERENCES library.Book(isbn),
    order_id INTEGER NOT NULL REFERENCES library.Order(id),
    quantity INTEGER NOT NULL,
    PRIMARY KEY(book_isbn, order_id)
);

CREATE TABLE IF NOT EXISTS library.ReservationBook (
    book_isbn CHAR(13) NOT NULL REFERENCES library.Book(isbn),
    reservation_id INTEGER NOT NULL REFERENCES library.Reservation(id),
    quantity INTEGER NOT NULL,
    PRIMARY KEY(book_isbn, reservation_id)
);