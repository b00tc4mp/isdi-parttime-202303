const { ObjectId } = require('mongodb')
const context = require('../context')
const {
    validators: { validateUserId, validatePassword, validateNewPassword },
    errors: { ExistenceError, ContentError }
} = require('com')

/**
 * 
 * @param {string} userId 
 * @param {string} currentPassword 
 * @param {string} newPassword 
 * @param {string} repeatPassword 
 * @returns {Promise<Object>} returns a promise object contains de user with the user password updated 
 * 
 * @throws {TypeError} on non-string id and current password, new password, and confirm password (sync)
 * @throws {ContentError} on empty id or current password, new password, and confirm password (sync)
 * @throws {FormatError} wrong format on current password, new password, and confirm password (sync)
 * 
 * @throws {AuthError} on failed correlation on db and provided data in order to authorize this action (async)
 * @throws {ExistenceError} on user not found (async)

 */
module.exports = (userId, currentPassword, newPassword, repeatPassword) => {
    validateUserId(userId)
    validatePassword(currentPassword)
    validatePassword(newPassword)
    validatePassword(repeatPassword)
    const { users } = context
    const _user = { _id: new ObjectId(userId) }

    return users.findOne(_user)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            if (user.password !== currentPassword) throw new ContentError("Current password does not match")

            if (currentPassword === newPassword) throw new ContentError("New password must be different as previous password")

            if (newPassword !== repeatPassword) throw new ContentError("New password and new password confirmation does not match")

            return users.updateOne(_user, { $set: { password: newPassword } })
        })
}