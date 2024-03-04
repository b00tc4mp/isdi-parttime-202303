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

    return User.findById(userId, "name, avatar").lean()
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            delete user._id

            return user
        })
}