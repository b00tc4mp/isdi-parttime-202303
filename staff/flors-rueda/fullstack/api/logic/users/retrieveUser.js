const { validators: { validateId } } = require('com');

const { User } = require('../../data/models')

module.exports = function retrieveUser(userId) {
    validateId(userId);

    return User.findById(userId).then(foundUser => {
        if (!foundUser) throw new Error('user not found');

        const { username, name, mail, avatar } = foundUser;

        const user = { username, name, mail, avatar }

        return user;
    })
}
