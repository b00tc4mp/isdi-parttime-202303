const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

/**
 * Retrieve's a logged user data
 * 
 * @param {string} userId The user id
 * 
 * @returns {object} User data
 */

module.exports = (userId) => {
    validateId(userId, 'userId');

    return (async () => {
        const user = await User.findById(userId, 'username avatar color joined followers saves cc').lean();
        if (!user) throw new ExistenceError('user not found');
        user.id = user._id.toString();
        delete user._id;
        return user;
    })()
}