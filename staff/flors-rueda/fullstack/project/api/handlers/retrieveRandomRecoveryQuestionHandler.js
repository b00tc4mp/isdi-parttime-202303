const { retrieveRandomRecoveryQuestion } = require('../logic');
const { handleErrors } = require('./helpers');

/**
 * Route handler to retrieve a random recovery question.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully retrieve a question.
 * @throws {Error} If there is an error.
 */
module.exports = handleErrors((req, res) => {
    const { username } = req.body;
    return retrieveRandomRecoveryQuestion(username).then(recoveryQuestion => res.json(recoveryQuestion));
})