const jwt = require('jsonwebtoken')

/**
 * Extracts user ID from an authorization token.
 *
 * @param {Object} req The request object containing the headers.
 * @returns {string} The extracted user id from the authorization token.
 */
module.exports = (req) => {
    const { authorization } = req.headers;
    const token = authorization.slice(7);

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { sub: userId } = payload;

    return userId;
}

