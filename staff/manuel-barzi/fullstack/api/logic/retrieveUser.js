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

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            // sanitize

            delete user._id
            delete user.password
            delete user.favs

            return user
        })
}