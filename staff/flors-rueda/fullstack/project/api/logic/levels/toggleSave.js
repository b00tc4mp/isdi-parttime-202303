const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User, Level } = require('../../data/models');

/**
 * Toggle's user save of a level
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

    const saves = user.saves || [];

    const index = saves.indexOf(levelId);
    if (index !== -1) {
        saves.splice(index, 1);
    } else {
        saves.push(levelId);
    }

    await User.updateOne({ _id: userId }, { saves: saves });

};
