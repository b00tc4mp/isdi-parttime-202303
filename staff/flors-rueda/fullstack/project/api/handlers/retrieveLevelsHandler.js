const { retrieveLevels } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to retrieve all levels created so far.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retrieve all levels.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const sort = parseInt(req.query.sort) || 0;
    const page = parseInt(req.query.page) || 1;
    const userId = extractUserId(req);

    return retrieveLevels(userId, sort, page).then((levels) => res.json(levels));
});