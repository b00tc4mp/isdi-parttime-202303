const { addRecoveryQuestion } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

/**
 * Route handler for adding recovery questions to a user.
 *
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @returns {Promise} A Promise that resolves after successfully adding recovery questions.
 * @throws {Error} If there is an error while adding recovery questions or handling errors.
 */
module.exports = handleErrors((req, res) => {
    const { password, recoveryQuestions } = req.body;
    const userId = extractUserId(req);
    return addRecoveryQuestion(userId, password, recoveryQuestions).then(() => res.status(201).send());
})
