const { deleteLevel } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler for deleting a level.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully deleting a level.
 * @throws {Error} If there is an error while deleting a level or handling errors.
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { levelId } = req.params;
    return deleteLevel(userId, levelId).then(() => res.status(200).send());
})