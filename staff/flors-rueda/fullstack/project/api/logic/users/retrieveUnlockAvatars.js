const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

/**
 * Retrieve's all the user unlocked avatars
 * 
 * @param {string} userId The user id
 * 
 * @returns {[string]} All the unlocked avatars
 */

module.exports = (userId) => {
    validateId(userId, 'userId');

    return (async () => {
        const user = await User.findById(userId, 'unlockAvatars').lean();
        if (!user) throw new ExistenceError('user not found');
        return user.unlockAvatars;
    })()
}