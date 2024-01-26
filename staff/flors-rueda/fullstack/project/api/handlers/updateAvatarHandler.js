const { updateAvatar } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to update a user's avatar.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully updating the avatar.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { avatar } = req.body;
    return updateAvatar(userId, avatar).then(() => res.status(201).send());
})