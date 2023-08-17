const {
    validators: { validateId, validateColor },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

/**
 * Change's a user display color
 * 
 * @param {string} userId The user id
 * @param {string} color The user new color
 * 
 */

module.exports = (userId, color) => {
    validateId(userId, 'userId');
    validateColor(color);

    return (async () => {
        const user = await User.findById(userId);
        if (!user) throw new ExistenceError('user not found');
        await User.updateOne({ _id: userId }, { color: color });
    })()

}
