const { recoverPassword } = require('../logic');
const { handleErrors } = require('./helpers');


/**
 * Route handler for recovering a user's password.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully recovering the password.
 * @throws {Error} If there is an error while recovering the password or handling errors.
 */
module.exports = handleErrors((req, res) => {
    const { username, newPassword } = req.body;
    return recoverPassword(username, newPassword)
        .then(() => res.status(201).send());
})