const {
    validators: { validateId, validatePassword, validateRecoveryQuestion },
    errors: { ExistenceError, AuthError }
} = require('com');
const { User } = require('../../data/models');
const bcrypt = require('bcryptjs');

/**
 * Add new security questions to a registered user while checking password validity
 * 
 * @param {string} userId The user id
 * @param {string} password The user password
 * @param {[object]} newQuestions The array of new recovery questions and answers
 * 
 */

module.exports = async (userId, password, newQuestions) => {
    validateId(userId, 'userId');
    validatePassword(password);

    for (let question of newQuestions) {
        validateRecoveryQuestion(question);
    }

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new AuthError('wrong credentials');

        const hashedQuestions = [];
        for (let question of newQuestions) {
            const standardizedAnswer = question.answer.toLowerCase();
            const cryptAnswer = await bcrypt.hash(standardizedAnswer, 10);
            hashedQuestions.push({
                question: question.question,
                answer: cryptAnswer
            });
        }

        const updatedQuestions = [...user.recoveryQuestions, ...hashedQuestions];

        await User.updateOne({ _id: userId }, { recoveryQuestions: updatedQuestions });
    })()
}
