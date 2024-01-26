const {
    errors: { ExistenceError },
    validators: { validateId },
} = require('com');
const { Level, User } = require('../../data/models');

/**
 * Retrieves a level to play by it's id
 * 
 * @param {string} userId The logged user id
 * @param {string} levelId The level id
 * 
 * @returns {object} Level information
 */

module.exports = (userId, levelId) => {
    validateId(userId, 'userId');
    validateId(levelId, 'levelId');

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');

        return Level.findById(levelId).then(level => {
            if (!level) throw new ExistenceError('level not found');
            return level
        })
    })()
}