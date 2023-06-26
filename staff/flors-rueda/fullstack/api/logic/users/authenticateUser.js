const { validators: { validatePassword, validateUsername } } = require('com');

const context = require('../context');

module.exports = function authenticateUser(userName, password) {
    validateUsername(userName);
    validatePassword(password);

    const username = `@${userName.toLowerCase()}`;

    const { users } = context;

    return users.findOne({ username }).then((user) => {
        if (!user) throw new Error(`user with username ${username} not found`);

        if (user.password !== password) throw new Error('wrong credentials');

        return user._id.toString();
    })
}