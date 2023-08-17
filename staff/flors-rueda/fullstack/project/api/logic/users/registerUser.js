const { User, Achievements } = require('../../data/models');
const { errors: { DuplicityError, UnknownError } } = require('com');
const {
    validators: { validateUsername, validateColor, validatePassword, validateRecoveryQuestion, },
} = require('com');
const bcrypt = require('bcryptjs');
const achievements = require('../../data/achievements');

/**
 * Creates a new user
 * 
 * @param {string} username The user username
 * @param {string} password The user password
 * @param {string} color The user selected color
 * @param {[object]} recoveryQuestions The user recovery question and it's answer
 * 
 * @returns {boolean} Is answer correct
 */

module.exports = (username, password, color, recoveryQuestions) => {
    validateUsername(username);
    validatePassword(password);
    validateColor(color);
    for (let question of recoveryQuestions) {
        validateRecoveryQuestion(question);
    }

    return (async () => {
        try {
            const cryptPassword = await bcrypt.hash(password, 10);

            for (let question of recoveryQuestions) {
                const standarizeAnswer = (question.answer).toLowerCase();
                const cryptAnswer = await bcrypt.hash(standarizeAnswer, 10);
                question.answer = cryptAnswer
            }

            const newUser = await User.create({
                username,
                password: cryptPassword,
                color,
                recoveryQuestions,
                avatar: 'beach',
                joined: Date.now(),
                saves: [],
                follows: [],
                followers: [],
                unlockAvatars: ['beach'],
                cc: 500,
            });

            await Achievements.create({
                user: newUser._id,
                progressByAchievement: achievements,
            })
        } catch (error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with username ${username} already exists`)

            throw new UnknownError(error.message)
        }
    })();
}