const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User, Level } = require('../../data/models');

/**
 * Toggle's user like in a level
 * 
 * @param {string} levelId The level id
 * @param {string} userId The user id
 * 
 */

module.exports = async (levelId, userId) => {
    validateId(levelId, 'levelId');
    validateId(userId, 'userId');

    const user = await User.findById(userId);
    const level = await Level.findById(levelId);

    if (!level) throw new ExistenceError('level not found');
    if (!user) throw new ExistenceError('user not found');

    const likes = level.likes || [];

    const index = likes.indexOf(userId);
    if (index !== -1) {
        likes.splice(index, 1);
    } else {
        likes.push(userId);
    }

    await Level.updateOne({ _id: levelId }, { likes: likes });

};
