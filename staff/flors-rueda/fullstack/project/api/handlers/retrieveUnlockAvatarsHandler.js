const { retrieveUnlockAvatars } = require('../logic');
const { handleErrors } = require('./helpers');

/**
 * Route handler to retrieve all unlocked avatars of a user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retrieve all avatars.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveUnlockAvatars(userId).then((unlockAvatars) => res.json(unlockAvatars))
})