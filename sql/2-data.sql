INSERT INTO library.author (id, name, description)
VALUES (1, 'Peter Benchley', 'Peter Bradford Benchley (New York, 8 maggio 1940 – Princeton, 11 febbraio 2006) è stato un giornalista e scrittore statunitense. Come scrittore, l''opera che ebbe più successo fu il romanzo "Jaws" (trad. "fauci"), tradotto in italiano come Lo squalo (1974), ispirato ad una vicenda realmente accaduta decenni prima e riguardante alcune vittime di attacchi di uno squalo nel New Jersey. Per 44 settimane il libro comparve nella lista dei più venduti; un anno dopo Steven Spielberg trasse il film omonimo Lo squalo, campione d''incassi e che lanciò Spielberg nel firmamento del Cinema. In seguito scrisse altri romanzi ambientati nel mare, da cui furono tratti dei film; in entrambi i casi non fu mai replicato il successo dell''opera prima. Ricordiamo quindi "The deep" (trad. "Abissi") e "The island" con Michael Caine nel ruolo del protagonista (trad. "L''isola"). '),
       (2, 'Lilian Darcy', 'Lilian Darcy è uno scrittrice australiana popolare di oltre 75 romanzi rosa dal 1981'),
       (3, 'Susan Mallery', 'Susan Mallery è un''artista di successo numero uno del New York Times che ha scritto più di 150 romanzi su relazioni familiari, amichevoli e romantiche che definiscono la vita delle donne. È meglio conosciuta per aver inserito personaggi sfumati in situazioni complesse e di vita reale con sorprendenti colpi di scena.'),
       (4, 'Candice Dow', 'Candice Dow è un ingegnere informatico e laureato all''Università del Maryland Eastern Shore e alla Johns Hopkins University. Risiede a Owings Mills, nel Maryland, ma assapora le vacanze del fine settimana sulla spiaggia. Sta lavorando al suo secondo romanzo.'),
       (5, 'Bali Rai', 'Bali Rai è un autore inglese di narrativa per bambini e giovani adulti.'),
       (6, 'Lynsay Sands', 'Lynsay Sands è un''autrice canadese pluripremiata di oltre 30 libri. Lei è nota per l''umorismo che introduce nelle sue storie. Mentre scrive romanzi d''amore sia storici che paranormali, è meglio conosciuta per la sua serie Argeneau su una moderna famiglia di vampiri.'),
       (7, 'Stephen King', 'Stephen Edwin King (Portland, 21 settembre 1947) è uno scrittore e sceneggiatore statunitense, uno dei più celebri autori di letteratura fantastica, in particolare horror, del XX e XXI secolo. Scrittore molto prolifico, nel corso della sua carriera iniziata nel 1974 con Carrie, ha pubblicato oltre ottanta opere, anche con lo pseudonimo di Richard Bachman, fra romanzi e antologie di racconti, entrate spesso nella classifica dei best seller e vendendo oltre 500 milioni di copie.'),
       (8, 'Dean Ray Koontz', 'Dean Ray Koontz (Everett, 9 luglio 1945) è uno scrittore statunitense, noto per i romanzi che possono essere indicativamente descritti come suspense thriller, ma che incorporano di frequente elementi di horror, fantascienza, giallo e satira.All''inizio della sua carriera Koontz scrisse usando numerosi pseudonimi, mentre dagli anni ottanta ha pubblicato prevalentemente col proprio nome. '),
       (9, 'Roald Dahl', 'Roald Dahl (Llandaff, 13 settembre 1916 – Oxford, 23 novembre 1990) è stato uno scrittore, sceneggiatore e aviatore gallese, conosciuto soprattutto per i suoi romanzi per l''infanzia. È anche co-inventore della valvola WDT (Wade-Dahl-Till), utilizzata per contrastare gli effetti dell''idrocefalia. '),
       (10, 'Peggy Parish', 'Margaret Cecile "Peggy" Parish era una scrittrice americana nota per la serie di libri per bambini e il personaggio immaginario Amelia Bedelia. Parish è nata a Manning, nel Sud Carolina, in una famiglia povera, ha frequentato l''Università della Carolina del Sud e ha conseguito una laurea in lettere in inglese. '),
       (11, 'Colin Dexter', 'Norman Colin Dexter (Stamford, 29 settembre 1930 – Oxford, 21 marzo 2017) è stato uno scrittore britannico. Considerato uno dei più importanti esponenti contemporanei del poliziesco classico, è stato autore di romanzi e racconti il cui protagonista è l''ispettore capo della Thames Valley Police Endeavour Morse, popolarissimo in Gran Bretagna anche grazie a una fortunata serie televisiva di 33 episodi interpretata da John Thaw e Kevin Whately e trasmessa ininterrottamente dal 1987 al 2000, nella quale lo stesso Dexter - alla maniera di Alfred Hitchcock - è apparso quasi in ogni episodio in un cameo.');


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



INSERT INTO library.book (isbn, name, description, price, author_id, genre_id, theme_id, book_event)
VALUES ('9781439148501', 'Under the Dome', 'Durante una mattina di ottobre, su Chester''s Mill, nel Maine, cala una cupola trasparente, tranciando tutto ciò che si trova lungo il suo perimetro, proprio come una ghigliottina. Aerei e macchine vanno a sbattere contro questo muro invisibile, distruggendosi. Tutta la cittadina, che conta circa duemila abitanti, si trova isolata dal resto del mondo. La prima vittima a morire è la moglie del primo consigliere, Claudette Sanders, che stava facendo un volo in aeroplano, assieme al suo istruttore di volo. ', 7.50, 7, 2, 5, NULL),
       ('9780553384512', 'Forever Odd', 'Nel labirinto delle ombre (Forever Odd) è un romanzo di Dean Koontz, ed il secondo della serie avente per protagonista Odd Thomas. ', 13.00, 8, 2, 6, NULL),
       ('9780141301068', 'Mathilda', 'In una landa isolata dal mondo la giovane Matilda decide di scrivere, in punto di morte, una lettera confessione al suo amico poeta Woodville, per rivelargli il terribile segreto che da anni nasconde. La lettera, suddivisa in due parti, comincia con la storia della vita di Matilda; racconta di come la sua nascita abbia portato alla morte della madre Diana a causa di complicazioni dovute al parto, e di come il padre (di cui mai viene rivelato il nome) l''abbia abbandonata ad una sua sorellastra perché si sentiva incapace di crescere una figlia senza la sua amata moglie. Matilda cresce così sentendosi abbandonata da tutti e soprattutto non amata (nemmeno sua zia le voleva bene), questo fino a quando, all''età di 16 anni, il padre si ripresenta a casa con l''intenzione di rimediare al torto fatto alla figlia prendendosi cura di lei. Comincia così quello che Matilda stessa definisce il momento più bello della sua vita: suo padre è tornato, le vuole bene e trascorreranno insieme il resto della loro vita.', 11.50, 9, 3, 7, 4),
       ('9780060099459', 'Merry Christmas, Amelia Bedelia', 'Alla vigilia di Natale, Amelia Bedelia deve preparare la casa Rogers per una visita da zia Myra. Ma come al solito, Amelia prende letteralmente le indicazioni e stravolge la casa in modo delizioso. La torta ha molte date. Sei tazze di popcorn per le palle e altro per l''albero. Accompagnala con i canti. Tagliare l''albero. Luci a stringa. Metti una grande stella in cima all''albero.', 10.25, 10, 4, 8, 5),
       ('9780330350341', 'Death Is Now My Neighbour', 'Il tranquillo quadrilatero del Lonsdale College sembra lontano dagli shock del mondo esterno - come le riprese di una giovane donna nella sua casa di North Oxford. Ma le cose a Lonsdale non sono così tranquille come sembrano. Il Maestro del college è in pensione, e due maestri senior, Denis Cornford e Julian Storrs, stanno gareggiando, discretamente ma furiosamente, per succedergli.', 25.70, 11, 5, 3, 6),
       ('9780449219638', 'Jaws', 'La storia narra di un enorme squalo che sta mietendo vittime vicino alla spiaggia della città di Amity, a Long Island. Il sindaco si dimostra preoccupato per il minore afflusso di turisti e riesce a non far chiudere la spiaggia. Le morti continuano e il capo della polizia Martin Brody chiede l''aiuto dell''esperto pescatore Quint e di un giovane biologo marino, Matt Hooper. Questi intreccia una relazione con la moglie di Brody, che lentamente insospettisce il poliziotto. Inizieranno la caccia allo squalo insieme, con il sospetto che aleggia nell''aria. Alla fine, tuttavia, dopo tre giorni drammatici trascorsi sul mare, solo Brody uscirà vivo dalla tragica missione.', 20.99, 1, 1, 1, NULL),
       ('9780373194780', 'Raising Baby Jane', 'Connor Callahan aveva appena incontrato Allie Todd, ma sentì immediatamente un enorme bisogno di proteggerla. E per capire perché si è trasformata in ghiaccio ogni volta che teneva la sua nipotina. Sentiva che la bella Allie stava resistendo alla sua tempesta: una ancora più feroce della tempesta di neve che li aveva bloccati in una cabina remota. La sua combinazione di forza e vulnerabilità lacerò il suo cuore un tempo irrequieto. Ma è stato solo dopo aver salvato Allie da un tragico incidente che ha sospettato il suo segreto più intimo. E se baby Jane non fosse la nipote di Allie, ma sua figlia ...?', 0.99, 2, 1, 2, 1),
       ('9780373242207', 'Millionaire Bachelor', 'Dopo aver girato una lunga storia sulla sua vita, Cathy Eldridge, operatore del servizio di risposta, può capire perché il milionario recluso Stone Ward si gode le loro telefonate notturne. Anche lei fa tesoro dei momenti in cui gli rivela la sua anima. Hanno costruito un''amicizia intima, sebbene non si siano mai incontrati di persona. Ma poi una svolta del destino la porta faccia a faccia con il suo uomo fantastico ... e nella sua casa. La pietra è molte cose, ma per lo più lui è fuori portata, ricco, di bell''aspetto e misteriosamente sexy. Cosa mai avrebbe mai visto in lei? Cathy è determinata a trasformarsi in una donna che ha sempre finto di essere, ma non è l''unica con un passato da superare ...', 4.48, 3, 1, 2, 2),
       ('9780758210531', 'Caught In The Mix', 'Caught Up In Love - Ma fuori nel mondo reale, il loro legame sarà testato ancora e ancora. Dalla tensione dell''amore a distanza e dall''attrattiva di due carriere ad alta potenza ai consigli ben intenzionati ma fuorvianti degli amici, ai pregiudizi della famiglia e al forte fascino della nuova passione e dei giocatori, Clark e Devin sono in per un giro che potrebbe farli a pezzi per sempre. Caught In The Mix Now - per due persone intrappolate nel mix di segreti, drammi familiari, bugie, lotte di carriera e le dure verità di crescere e andare avanti, l''amore è tutt''altro che facile - e fare la cosa giusta da solo è il la lezione più difficile di tutte', 2.49, 4, 1, 3, NULL),
       ('9781842993316', 'Two Timer', 'Two Timer Harj è felice di avere due ragazze, ma come farà a impedirle di scoprirsi l''un l''altro? Commedia molto divertente. Barrington Stoke è specializzato in libri per lettori riluttanti, in difficoltà e dislessici.', 8.40, 5, 1, 3, NULL),
       ('9780061474323', 'Born To Bite', 'Ma con tutte e tre le sue ultime mogli che incontrano fini sfortunati e inopportuni, questo sexy immortale è un amante o un assassino? Questo è ciò che Eshe d''Aureus intende scoprire. In qualità di esecutore, è suo compito consegnare i vampiri canaglia alla giustizia, anche se il ladro in questione le fa sanguinare il sangue.', 4.48, 6, 1, 4, 3);



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