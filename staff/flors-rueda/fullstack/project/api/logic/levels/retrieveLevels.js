const {
    validators: { validatePage, validateSort, validateId },
} = require('com');
const { Level, User } = require('../../data/models');

/**
 * Retrieves all the levels paginated sorted in base of the sorting criteria
 * 
 * @param {string} userId The logged user id
 * @param {string} sort The type of sorting to apply
 * @param {number} page The number in the paginated info to retrieve
 * 
 * @returns {[object]} Total levels number and levels with display information
 */

module.exports = async (userId, sort, page) => {
    validateId(userId, 'userId');
    validateSort(sort);
    validatePage(page);

    const user = await User.findById(userId);
    if (!user) throw new ExistenceError('user not found');

    let sortCriteria = {};

    switch (sort) {
        case 1: //oldest
            sortCriteria = { date: 1 };
            break;
        case 2: //liked
            sortCriteria = { likesCount: -1 };
            break;
        default:
            sortCriteria = { date: -1 }; //newest
    }

    const skip = (page - 1) * 12;

    return Promise.all([
        Level.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    author: 1,
                    likes: 1,
                    date: 1,
                    likesCount: { $size: '$likes' }
                }
            },
            { $sort: sortCriteria },
            { $skip: skip },
            { $limit: 12 }
        ]),
        Level.countDocuments()
    ])
        .then(([levels, totalLevels]) => {
            return {
                levels: levels.map(level => {
                    return {
                        id: level._id.toString(),
                        name: level.name,
                        author: level.author.toString(),
                        likes: level.likes,
                        date: level.date,
                    };
                }),
                totalLevels: totalLevels
            };
        });
};