console.log("config.auth.js inicio");

const jwt = require('jsonwebtoken');
const _env = require('../.env');

module.exports = (req, res, next) => {

    console.log('token');
    console.log('request inicio');
    console.log(req.url);
    console.log('request fim');
    // CORS preflight request
    if (req.method === 'OPTIONS' ) {
        next();
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization'];

        console.log(token);
        console.log(_env._authSecret);

        if (!token) {
            return res.status(403).send({ errors: ['No token provided.'] });
        }

        jwt.verify(token, _env._authSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to authenticate token.']
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
}
