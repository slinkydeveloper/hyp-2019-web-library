const _ = require('lodash');

module.exports = (req, res, next) => {
    if (!_.has(req, 'session.username'))
        res.status(401).end();
    else next();
};