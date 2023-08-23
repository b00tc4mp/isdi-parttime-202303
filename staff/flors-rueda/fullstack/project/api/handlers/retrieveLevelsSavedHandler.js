const { retrieveLevelsSaved } = require('../logic');
const { handleErrors } = require('./helpers');

/**
 * Route handler to retrieve all levels saved by user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retrieve all levels.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveLevelsSaved(userId).then((levels) => res.json(levels));
})