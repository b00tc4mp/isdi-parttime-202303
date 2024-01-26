const { updateColor } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to update a user's color.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully updating the color.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { color } = req.body;
    return updateColor(userId, color).then(() => res.status(201).send());
})