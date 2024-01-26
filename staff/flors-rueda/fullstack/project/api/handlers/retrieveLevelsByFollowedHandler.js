const { retrieveLevelsByFollowed } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to retrieve all levels created by the followed users of a user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retrieve all levels.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveLevelsByFollowed(userId).then((levels) => res.json(levels));
})