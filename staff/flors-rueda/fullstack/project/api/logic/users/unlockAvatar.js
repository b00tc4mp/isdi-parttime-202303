const {
    validators: { validateId, validateAvatar },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

module.exports = (userId, avatar) => {
    validateId(userId, 'userId');
    validateAvatar(avatar);

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');
        const updatedAvatars = user.unlockAvatars
        updatedAvatars.push(avatar)
        await User.updateOne({ _id: userId }, { unlockAvatars: updatedAvatars });
    })()
}