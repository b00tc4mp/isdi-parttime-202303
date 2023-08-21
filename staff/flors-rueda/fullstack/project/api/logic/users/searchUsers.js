const {
    validators: { validateName, validateId },
} = require('com');
const { User } = require('../../data/models');

/**
 * Retrieves users filtered by username and sorted from newest to oldest
 * 
 * @param {string} userId The logged user id
 * @param {string} username The username of the level to search for, case insensitive
 * 
 * @returns {[object]} Levels with display information matching the name, sorted by date
 */
module.exports = (userId, username) => {
    validateId(userId, 'userId');
    validateName(username);

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');

        return User.aggregate([
            {
                $match: { username: { $regex: username, $options: 'i' } }
            },
            { $sort: { joined: -1 } }
        ])
            .then((users) => {
                const foundUsers = users.filter(user => userId !== user._id.toString());
                return foundUsers;
            });
    })()
};