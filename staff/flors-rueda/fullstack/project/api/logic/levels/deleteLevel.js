const {
    errors: { ExistenceError },
    validators: { validateId },
} = require('com');
const { Level, User } = require('../../data/models');

/**
 * Deletes a level by its id
 * 
 * @param {string} userId The logged user id
 * @param {string} levelId The level id
 * 
 */
module.exports = (userId, levelId) => {
    validateId(userId, 'userId');
    validateId(levelId, 'levelId');

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');

        const level = await Level.findById(levelId);
        if (!level) throw new ExistenceError('level not found');

        await Level.deleteOne({ _id: levelId });
    })()
};