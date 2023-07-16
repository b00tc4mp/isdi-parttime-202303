const { User } = require('../../data/models')
const {
    validators: { validateUserId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {string} userId user id
 * @returns {Promise<Object>} returns an object with de user
 * 
 * @throws {TypeError} on non-string id (sync)
 * @throws {ContentError} on empty id (sync)
 * 
 * @throws {ExistenceError} on user not found (async)
 */

module.exports = userId => {
    validateUserId(userId)


    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            delete user._id
            delete user.password

            return user
        })

}