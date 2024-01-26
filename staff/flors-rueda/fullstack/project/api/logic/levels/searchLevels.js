const {
    validators: { validateName, validateId },
    errors: { ExistenceError }
} = require('com');
const { Level, User } = require('../../data/models');

/**
 * Retrieves levels filtered by name and sorted from newest to oldest
 * 
 * @param {string} userId The logged user id
 * @param {string} name The name of the level to search for, case insensitive
 * 
 * @returns {[object]} Levels with display information matching the name, sorted by date
 */
module.exports = (userId, name) => {
    validateId(userId, 'userId');
    validateName(name);

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');

        return Level.aggregate([
            {
                $match: { name: { $regex: name, $options: 'i' } }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    author: 1,
                    likes: 1,
                    date: 1,
                }
            },
            { $sort: { date: -1 } }
        ])
            .then((levels) => {
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
    })()
};






