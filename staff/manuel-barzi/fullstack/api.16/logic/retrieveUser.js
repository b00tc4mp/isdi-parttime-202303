const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User } = require('../data/models')

/**
 * Retrieves a user by id
 * 
 * @param {string} userId ...
 * @returns {Promise<Object>} ...
 */
module.exports = userId => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId, 'name avatar').lean()

        if (!user) throw new ExistenceError('user not found')

        // sanitize

        delete user._id
        // delete user.__v

        return user
    })()
}