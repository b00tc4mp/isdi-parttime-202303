const { User } = require('../../data/models');
const { errors: { AuthError, ExistenceError } } = require('com');
const {
    validators: { validateUsername, validatePassword },
} = require('com');
const bcrypt = require('bcryptjs');

module.exports = (username, password) => {
    validateUsername(username);
    validatePassword(password);

    return (async () => {
        const user = await User.findOne({ username });
        if (!user) throw new ExistenceError('user not found');
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new AuthError('wrong credentials');

        return user.id;
    })();
};
