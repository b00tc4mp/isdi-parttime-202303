const { retrieveLevelsByAuthor } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to retrieve all levels created by a user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retrieve all levels.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const { authorId } = req.params;
    const userId = extractUserId(req);
    return retrieveLevelsByAuthor(userId, authorId).then((levels) => res.json(levels));
})