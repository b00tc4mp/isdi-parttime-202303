const {
    validators: { validateUsername },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

/**
 * Retrieve's one of the user recovery question
 * 
 * @param {string} username The user username
 * 
 * @returns {object} A question and it's id
 */

module.exports = (username) => {
    validateUsername(username);

    return (async () => {
        const user = await User.findOne({ username }, 'recoveryQuestions').lean();
        if (!user) throw new ExistenceError('user not found');
        const recoveryQuestion = user.recoveryQuestions[Math.floor(Math.random() * user.recoveryQuestions.length)];
        recoveryQuestion.id = (recoveryQuestion._id).toString();
        delete recoveryQuestion._id;
        delete recoveryQuestion.answer;
        return recoveryQuestion;
    })()
}