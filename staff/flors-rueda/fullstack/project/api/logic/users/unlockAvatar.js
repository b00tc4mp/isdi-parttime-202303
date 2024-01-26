const {
    validators: { validateId, validateAvatar },
    errors: { ExistenceError, DuplicityError }
} = require('com');
const { User } = require('../../data/models');

/**
 * Updates the unlocked avatar array of a user with a new avatar
 * 
 * @param {string} userId The user id
 * @param {string} avatar The new avatar
 * 
 */

module.exports = (userId, avatar) => {
    validateId(userId, 'userId');
    validateAvatar(avatar);

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');
        const updatedAvatars = user.unlockAvatars;
        if (updatedAvatars.includes(avatar)) throw new DuplicityError('avatar already unlocked')
        updatedAvatars.push(avatar)
        await User.updateOne({ _id: userId }, { unlockAvatars: updatedAvatars });
    })()
}