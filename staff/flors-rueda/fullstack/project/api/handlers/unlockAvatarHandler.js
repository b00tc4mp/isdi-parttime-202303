const { unlockAvatar } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to update a user's unlocked avatars.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully updating the unlocked avatars.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { avatar } = req.body;
    return unlockAvatar(userId, avatar).then(() => res.status(201).send());
})