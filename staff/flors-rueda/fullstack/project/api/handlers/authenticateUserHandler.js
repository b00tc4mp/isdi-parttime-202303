const { authenticateUser } = require('../logic');
const { handleErrors } = require('./helpers');
const jwt = require('jsonwebtoken');

/**
 * Route handler for authenticate a user and returns a JSON Web Token (JWT) upon successful authentication.
 * 
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A promise that resolves when the JWT is sent in the response.
 */
module.exports = handleErrors((req, res) => {
    const { username, password } = req.body;

    return authenticateUser(username, password)
        .then(userId => {
            const payload = { sub: userId };

            const { JWT_SECRET, JWT_EXPIRATION } = process.env;
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

            res.json(token);
        })
})