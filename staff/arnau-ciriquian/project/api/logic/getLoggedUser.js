const { User } = require('../data/models')
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

/**
 * Retrieves a user by id 
 * 
 * @param {string} userId User id
 * 
 * @returns {Promise<Object>} User name, email and avatar
 * 
 * @throws {TypeError} On non-string user id
 * @throws {ContentError} On empty user id
 * @throws {ExistenceError} On non-existing user
 */

module.exports = userId => {
    validateId(userId)

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            delete user._id
            delete user.password
            delete user.__v

            return user
        })
}