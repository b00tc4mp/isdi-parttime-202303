const { retrieveUserLogged } = require('../logic');
const { handleErrors } = require('./helpers');

/**
 * Route handler to retrieve logged user information.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retrieve all user info.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveUserLogged(userId)
        .then(user => res.json(user));
})