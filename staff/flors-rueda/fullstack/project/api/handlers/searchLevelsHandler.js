const { searchLevels } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to retrieve all levels that includes a string on its name.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retrieve all levels.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const { name } = req.params;
    const userId = extractUserId(req);
    return searchLevels(userId, name).then((levels) => res.json(levels));
})