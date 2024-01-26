const { registerUser } = require('../logic');
const { handleErrors } = require('./helpers');

/**
 * Route handler for registering a new user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully registering the user.
 * @throws {Error} If there is an error while registering the user or handling errors.
 */
module.exports = handleErrors((req, res) => {
    const { username, password, color, recoveryQuestions } = req.body;
    return registerUser(username, password, color, recoveryQuestions).then(() => res.status(201).send());
})
