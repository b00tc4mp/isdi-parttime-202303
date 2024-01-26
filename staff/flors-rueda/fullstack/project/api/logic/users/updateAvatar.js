const {
    validators: { validateId, validateAvatar },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

/**
 * Change's a user display avatar
 * 
 * @param {string} userId The user id
 * @param {string} avatar The user new avatar
 * 
 */

module.exports = (userId, avatar) => {
    validateId(userId, 'userId');
    validateAvatar(avatar);

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');
        if (!user.unlockAvatars.includes(avatar)) throw new ExistenceError('avatar not available');
        await User.updateOne({ _id: userId }, { avatar: avatar });
    })()
}