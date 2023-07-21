const { User } = require('../../data/models');
const { errors: { DuplicityError, UnknownError } } = require('com');
const {
    validators: { validateUsername, validateColor, validatePassword, validateRecoveryQuestion, },
} = require('com');
const bcrypt = require('bcryptjs');

module.exports = (username, password, color, recoveryQuestions) => {
    validateUsername(username);
    validatePassword(password);
    validateColor(color);
    for (let question of recoveryQuestions) {
        validateRecoveryQuestion(question);
    }

    return (async () => {
        try {
            const cryptPassword = await bcrypt.hash(password, 10)

            await User.create({
                username,
                password: cryptPassword,
                color,
                recoveryQuestions,
                avatar: 'beach',
                joined: Date.now(),
                saves: [],
            })
        } catch (error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with username ${username} already exists`)

            throw UnknownError(error.message)
        }
    })();
}