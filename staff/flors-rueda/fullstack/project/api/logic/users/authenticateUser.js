const { User } = require('../../data/models');
const { errors: { AuthError, ExistenceError } } = require('com');

const {
    validators: { validateUsername, validatePassword, },
} = require('com');

module.exports = (username, password) => {
    validateUsername(username);
    validatePassword(password);

    return User.findOne({ username }).then(user => {
        if (!user) throw new ExistenceError('user not found');
        if (user.password !== password) throw new AuthError('wrong credentials');
        return user.id;
    })
}