INSERT INTO library.author (id, name)
VALUES (1, 'Peter Benchley'),
       (2, 'Lilian Darcy'),
       (3, 'Susan Mallery'),
       (4, 'Candice Dow'),
       (5, 'Bali Rai'),
       (6, 'Lynsay Sands'),
       (7, 'Stephen King'),
       (8, 'Dean Ray Koontz'),
       (9, 'Roald Dahl'),
       (10, 'Peggy Parish'),
       (11, 'Colin Dexter');


INSERT INTO library.genre (id, name)
VALUES (1, 'Romance'),
       (2, 'Thriller'),
       (3, 'Fiction'),
       (4, 'Kids'),
       (5, 'Textbook');

INSERT INTO library.theme (id, name)
VALUES (1, 'Horror'),
       (2, 'Love'),
       (3, 'Urban story'),
       (4, 'Dangerous life'),
       (5, 'Family problems'),
       (6, 'Diversity'),
       (7, 'Childhood'),
       (8, 'Christmas');

INSERT INTO library.bookevent (id, location, presenter, date)
VALUES (1, 'Politecnico Di Milano', 'Mario Rossi', '2019-06-26'),
       (2, 'Fondazione Giangiacomo Feltrinelli', 'Giuseppe Verdi', '2019-8-21'),
       (3, 'Hangar Bicocca', 'Carlo Conti', '2019-8-25'),
       (4, 'Teatro Piccolo', 'Enrico Mentana', '2019-9-3'),
       (5, 'Mondadori Piazza Duomo', 'Antonella Clerici', '2019-9-11'),
       (6, 'Palazzo Marino', 'Beppe Sala', '2019-9-29');



INSERT INTO library.book (isbn, name, price, author_id, genre_id, theme_id, book_event)
VALUES ('9780449219638', 'Jaws', 20.99, 1, 1, 1, NULL),
       ('9780373194780', 'Raising Baby Jane', 0.99, 2, 1, 2, 1),
       ('9780373242207', 'Millionaire Bachelor', 4.48, 3, 1, 2, 2),
       ('9780758210531', 'Caught In The Mix', 2.49, 4, 1, 3, NULL),
       ('9781842993316', 'Two Timer', 8.40, 5, 1, 3, NULL),
       ('9780061474323', 'Born To Die', 4.48, 6, 1, 4, 3),
       ('9781439148501', 'Under the Dome', 7.50, 7, 2, 5, NULL),
       ('9780553384512', 'Forever Odd', 13.00, 8, 2, 6, NULL),
       ('9780141301068', 'Mathilda', 11.50, 9, 3, 7, 4),
       ('9780060099459', 'Merry Christmas, Amelia Bedelia', 10.25, 10, 4, 8, 5),
       ('9780330350341', 'Death Is Now My Neighbour', 25.70, 11, 5, 3, 6);



INSERT INTO library.relatedbook (book_id_1, book_id_2)
VALUES ('9780373194780', '9780373242207'),
       ('9780758210531', '9781842993316'),
       ('9780061474323', '9780449219638'),
       ('9780449219638', '9780061474323'),
('9781842993316', '9780373242207'),
('9780373242207', '9781842993316'),
('9780373242207', '9780373194780'),
('9781439148501', '9780373194780'),
('9780553384512', '9781439148501'),
('9780553384512', '9780758210531'),
('9780141301068', '9780373194780'),
('9780060099459', '9780141301068'),
('9780330350341', '9780061474323'),
('9780330350341', '9780758210531');