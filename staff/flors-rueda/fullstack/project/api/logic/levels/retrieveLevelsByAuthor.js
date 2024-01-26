const { Level, User } = require('../../data/models');
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');

/**
 * Retrieves all levels created by a user
 * 
 * @param {string} userId The logged user id
 * @param {string} authorId The author user id
 * 
 * @returns {[object]} Levels with display information
 */
module.exports = (userId, authorId) => {
    validateId(userId, 'userId');
    validateId(authorId, 'authorId');

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');

        const levels = await Level.find({ author: authorId })
            .select('_id name author likes date')
            .then(levels => {
                return levels.map(level => ({
                    id: level._id.toString(),
                    name: level.name,
                    author: level.author.toString(),
                    likes: level.likes,
                    date: level.date,
                }));
            });

        return levels;
    })()
};