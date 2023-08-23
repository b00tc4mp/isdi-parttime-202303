const { toggleFollow } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to change follow status for a concrete user.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully updating the follow.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const followerId = extractUserId(req);
    const { userId } = req.params;
    return toggleFollow(followerId, userId).then(() => res.status(201).send());
})