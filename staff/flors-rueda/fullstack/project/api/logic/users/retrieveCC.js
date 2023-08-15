const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

module.exports = (userId) => {
    validateId(userId, 'userId');

    return (async () => {
        const user = await User.findById(userId, 'cc').lean();
        if (!user) throw new ExistenceError('user not found');
        return user.cc;
    })()
}