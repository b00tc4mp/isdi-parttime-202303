const { Level, User } = require('../../data/models');
const {
    validators: { validateId },
} = require('com');

/**
 * Retrieves favorite levels of a user
 * 
 * @param {string} userId The user id
 * 
 * @returns {[object]} Levels with display information
 */

module.exports = (userId) => {
    validateId(userId, 'userId');

    return User.findById(userId)
        .select('saves')
        .then(user => {
            if (!user) throw new ExistenceError('user not found');
            const savedLevels = user.saves;

            return Level.find({ _id: { $in: savedLevels } })
                .select('_id name author likes date')
                .then(levels => {
                    return levels.map(level => {
                        return {
                            id: level._id.toString(),
                            name: level.name,
                            author: level.author.toString(),
                            likes: level.likes,
                            date: level.date,
                        };
                    });
                });
        });
};
