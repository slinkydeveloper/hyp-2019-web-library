const model = require('../models/index.js');
const _ = require('lodash');
const config = require('../config/config.js');
const doSHA512 = (str) => require('crypto').createHash('sha512').update(str).digest('hex');
const loggedCheckMiddleware = require('../utils/logged_check');

module.exports = (app, validator) => {

    app.post('/api/user/register', validator.validate('post', '/user/register'), (req, res, next) => {
        const newUser = {
            username: req.body.username,
            mail: req.body.mail,
            password: doSHA512(req.body.password)
        };
        model.User.create(newUser).then(user => {
            req.session.username = user.username;
            res.status(200).end()
        }, next);
    });

    app.post('/api/user/login', validator.validate('post', '/user/login'), (req, res, next) => {
        model.User.loginUser(req.body.usernameOrMail, doSHA512(req.body.password)).then(user => {
            if (_.isNull(user))
                res.status(404).end();
            else {
                req.session.username = user.username;
                res.status(200).end()
            }
        }, next);
    });

    app.get('/api/user', loggedCheckMiddleware, validator.validate('get', '/user'), (req, res, next) => {
        model.User.findByPk(req.session.username, {
            include: [
                {
                    model: model.Order,
                    as: 'Orders'
                },
                {
                    model: model.Reservation,
                    as: 'Reservations'
                }
            ]
        }).then(
            user => res.status(200).end(user.toExpandedJSON()),
            next
        )
    });

};