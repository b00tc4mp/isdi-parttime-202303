const { Level, User } = require('../../data/models');
const {
    validators: { validateId },
} = require('com');

/**
 * Retrieves all levels created by the user's id follows
 * 
 * @param {string} userId The user id
 * 
 * @returns {[object]} Levels with display information
 */

module.exports = (userId) => {
    validateId(userId, 'userId');

    return User.findById(userId)
        .select('follows')
        .then(user => {
            const followedAuthorIds = user.follows;
            followedAuthorIds.push(userId);

            return Level.find({ author: { $in: followedAuthorIds } })
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
