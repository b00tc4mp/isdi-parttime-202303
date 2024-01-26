const { validators: { validatePassword, validateUsername } } = require('com');
const { User } = require('../../data/models');

module.exports = function authenticateUser(userName, password) {
    validateUsername(userName);
    validatePassword(password);

    const username = `@${userName.toLowerCase()}`;

    return User.findOne({ username })
        .then(user => {
            if (!user) throw new Error(`user with username ${username} not found`)

            if (user.password !== password) throw new Error('wrong credentials')

            return user.id
        })
}

