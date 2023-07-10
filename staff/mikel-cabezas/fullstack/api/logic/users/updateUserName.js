const { ObjectId } = require('mongodb')
const context = require('../context')
const {
    validators: { validateUserId, validateText },
    errors: { ExistenceError }
} = require('com')


/**
 * 
 * @param {string} userId 
 * @param {string} newName 
 * @returns {Promise<Object>} returns a promise object contains de user with the user username updated 
 * 
 * @throws {TypeError} on non-string id and new username (sync)
 * @throws {ContentError} on empty id or new username (sync)
 * @throws {FormatError} wrong format on new username (sync) 
 * 
 * @throws {AuthError} on failed correlation on db and provided data in order to authorize this action (async)
 * @throws {ExistenceError} on user not found (async)

 */
module.exports = (userId, newName) => {
    validateUserId(userId)
    validateText(newName)

    const { users } = context
    const _user = { _id: new ObjectId(userId) }

    return users.findOne(_user)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return users.updateOne(_user, { $set: { name: newName } })
        })

}