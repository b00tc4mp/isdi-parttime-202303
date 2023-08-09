const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

module.exports = (userId) => {
    validateId(userId, 'userId');

    return (async () => {
        const user = await User.findById(userId, 'username avatar color joined followers saves').lean();
        if (!user) throw new ExistenceError('user not found');
        user.id = user._id.toString();
        delete user._id;
        return user;
    })()
}