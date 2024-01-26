const { checkRecoveryAnswer } = require('../logic');
const { handleErrors } = require('./helpers');

/**
 * Route handler to check if the provided recovery answer matches the user's saved answer.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {boolean} A promise that resolves when the verification result is sent in the response.
 */
module.exports = handleErrors((req, res) => {
    const { username, questionId, answer } = req.body;
    return checkRecoveryAnswer(username, questionId, answer)
        .then(match => res.json(match));
})