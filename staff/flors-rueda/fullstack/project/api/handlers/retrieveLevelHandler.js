const { retrieveLevel } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to retrieve a individual level.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully the level.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const { levelId } = req.params;
    const userId = extractUserId(req);
    return retrieveLevel(userId, levelId).then((level) => res.json(level))
})