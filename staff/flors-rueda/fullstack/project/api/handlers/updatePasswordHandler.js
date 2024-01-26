const { updatePassword } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler to update a user's password.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully updating the password.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { newPassword, oldPassword } = req.body;
    return updatePassword(userId, newPassword, oldPassword).then(() => res.status(201).send());
})