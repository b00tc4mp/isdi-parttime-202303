const {
    validators: { validateId, validateRecoveryAnswer, validateUsername },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');
const bcrypt = require('bcryptjs');

/**
 * Verifies if the recovery answer given is correct
 * 
 * @param {string} username The user username
 * @param {string} questionId The user recovery question id
 * @param {string} answer The given answer to a question
 * 
 * @returns {boolean} Is answer correct
 */

module.exports = (username, questionId, answer) => {
    validateUsername(username);
    validateId(questionId, 'questionId');
    validateRecoveryAnswer(answer);

    return (async () => {
        const user = await User.findOne({ username });
        if (!user) throw new ExistenceError('user not found');
        const recoveryQuestion = user.recoveryQuestions.find(
            question => question._id.toString() === questionId
        );
        if (!recoveryQuestion) throw new ExistenceError('question not found');
        const match = await bcrypt.compare(answer, recoveryQuestion.answer);
        return match;
    })()

}
