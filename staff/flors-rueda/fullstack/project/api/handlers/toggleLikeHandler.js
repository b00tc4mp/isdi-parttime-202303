const { toggleLike } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to change like status for a concrete level.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully updating the like.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { levelId } = req.params;
    return toggleLike(levelId, userId).then(() => res.status(201).send());
})