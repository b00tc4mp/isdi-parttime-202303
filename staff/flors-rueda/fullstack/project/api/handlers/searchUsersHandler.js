const { searchUsers } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to retrieve all users that includes a string on their username.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retrieve all users.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const { username } = req.params;
    const userId = extractUserId(req);
    return searchUsers(userId, username).then((users) => res.json(users));
})