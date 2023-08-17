const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

/**
 * Retrieve a user available cc
 * 
 * @param {string} userId The user id
 * 
 * @returns {number} user's available cc
 */

module.exports = (userId) => {
    validateId(userId, 'userId');

    return (async () => {
        const user = await User.findById(userId, 'cc').lean();
        if (!user) throw new ExistenceError('user not found');
        return user.cc;
    })()
}