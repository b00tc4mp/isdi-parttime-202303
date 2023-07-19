const { User } = require('../../data/models');
const { errors: { DuplicityError, UnknownError } } = require('com');

const {
    validators: { validateUsername, validateColor, validatePassword, validateRecoveryQuestion, },
} = require('com');

module.exports = (username, password, color, recoveryQuestions) => {
    validateUsername(username);
    validatePassword(password);
    validateColor(color);
    for (question of recoveryQuestions) {
        validateRecoveryQuestion(question);
    }

    return User.create({
        username,
        password,
        color,
        recoveryQuestions,
        avatar: 'beach',
        joined: Date.now(),
    }).catch(error => {
        if (error.message.includes('E11000')) throw new DuplicityError(`user with username ${username} already exists`);
        throw new UnknownError(error.message);
    })
}