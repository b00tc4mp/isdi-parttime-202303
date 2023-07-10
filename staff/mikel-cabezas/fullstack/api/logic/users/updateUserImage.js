const { ObjectId } = require('mongodb')
const context = require('../context')
const {
    validators: { validateUserId },
    errors: { ExistenceError }
} = require('com')

/**
 * 
 * @param {string} userId 
 * @param {string} avatar 
 * @returns {Promise<Object>} returns a promise object contains de user with the user image updated 
 * 
 * @throws {TypeError} on non-string id and avatar (sync)
 * @throws {ContentError} on empty id or avatar (sync)
 * @throws {FormatError} wrong format on avatar (sync)
 * 
 * @throws {AuthError} on failed correlation on db and provided data in order to authorize this action (async)
 * @throws {ExistenceError} on user not found (async)

 */
module.exports = (userId, avatar) => {
    validateUserId(userId)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { image: avatar } })
        })
}