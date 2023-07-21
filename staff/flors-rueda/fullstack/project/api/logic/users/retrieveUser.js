const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

module.exports = userId => {
    validateId(userId, 'userId');

    return (async () => {
        const user = await User.findById(userId, 'username avatar color').lean();
        if (!user) throw new ExistenceError('user not found');
        delete user._id;
        return user;
    })()
}