const {
    validators: { validateUserId },
    errors: { ExistenceError }
} = require('com')
const { ObjectId } = require('mongodb')
const context = require('../context')

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

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            delete user._id
            delete user.password

            return user
        })

}