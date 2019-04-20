const model = require('../models/index.js');
const _ = require('lodash');
const loggedCheckMiddleware = require('../utils/logged_check');

module.exports = (app, validator) => {

    app.get('/order/:orderId', loggedCheckMiddleware, validator.validate('get', '/order/{orderId}'), (req, res, next) => {
        model.Order.getOrder(req.params.orderId)
            .then(order => res.status(200).json(order.toExpandedJSON()), next)
    });

    app.post('/order', loggedCheckMiddleware, validator.validate('post', '/order'), (req, res, next) => {
        model.Order.addOrder(req.session.username, req.body)
            .then(order => model.Order.getOrder(order.id))
            .then(order => res.status(200).json(order.toExpandedJSON()), next)
    });

};