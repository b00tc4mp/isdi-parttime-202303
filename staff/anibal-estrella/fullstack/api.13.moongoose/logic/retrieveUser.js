const { validators: { validateId },
    errors: { ExistenceError } } = require('com')
const { User } = require('../data/models')

/**
 *  * Api/retriveUser:
 * Retrieves a user by id
 * @param {string} userId 
 * @returns {Promise<string>} The user ID
 */

module.exports = userId => {
    validateId(userId, 'user Id')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new ExistenceError('user not found')
            // sanitize

            delete user._id
            delete user.password
            delete user.favs
            delete user.__v

            return user
        })
}