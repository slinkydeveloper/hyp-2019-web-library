/* eslint global-require: "off" */
const model = {};
let initialized = false;

/**
 * Initializes sequelize models and their relations.
 * @param   {Object} sequelize  - Sequelize instance.
 * @returns {Object}            - Sequelize models.
 */
function init(sequelize) {
    delete module.exports.init; // Destroy itself to prevent repeated calls and clash with a model named 'init'.
    initialized = true;
    // Import model files and assign them to `model` object.
    model.Author = sequelize.import('./definition/author.js');
    model.Book = sequelize.import('./definition/book.js');
    model.Bookevent = sequelize.import('./definition/bookevent.js');
    model.Genre = sequelize.import('./definition/genre.js');
    model.Order = sequelize.import('./definition/order.js');
    model.Orderbook = sequelize.import('./definition/orderbook.js');
    model.Reservation = sequelize.import('./definition/reservation.js');
    model.Reservationbook = sequelize.import('./definition/reservationbook.js');
    model.Theme = sequelize.import('./definition/theme.js');
    model.User = sequelize.import('./definition/user.js');

    // All models are initialized. Now connect them with relations.
    require('./definition/author.js').initRelations();
    require('./definition/book.js').initRelations();
    require('./definition/bookevent.js').initRelations();
    require('./definition/genre.js').initRelations();
    require('./definition/order.js').initRelations();
    require('./definition/orderbook.js').initRelations();
    require('./definition/reservation.js').initRelations();
    require('./definition/reservationbook.js').initRelations();
    require('./definition/theme.js').initRelations();
    require('./definition/user.js').initRelations();
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
