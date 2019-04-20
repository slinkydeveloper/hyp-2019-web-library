const model = require('../models/index.js');
const _ = require('lodash');
const loggedCheckMiddleware = require('../utils/logged_check');

module.exports = (app, validator) => {

    app.get('/reservation/:reservationId', loggedCheckMiddleware, validator.validate('get', '/reservation/{reservationId}'), (req, res, next) => {
        model.Reservation.getReservation(req.params.reservationId)
            .then(reservation => res.status(200).json(reservation.toExpandedJSON()), next)
    });

    app.post('/reservation', loggedCheckMiddleware, validator.validate('post', '/reservation'), (req, res, next) => {
        model.Reservation.addReservation(req.session.username, req.body)
            .then(reservation => model.Reservation.getReservation(reservation.id))
            .then(reservation => res.status(200).json(reservation.toExpandedJSON()), next)
    });

};