const {
    validators: { validateNewPassword, validatePasswordConfirm, validateId },
    errors: { ExistenceError, AuthError, ContentError }
} = require('com')
const { User } = require('../data/models')

/**
 * Updates User password
 * 
 * @param {string} userId User id
 * @param {string} password User actual password
 * @param {string} newPassword User new password
 * @param {string} newPasswordConfirmation User new password confirmation
 * 
 * @returns
 * 
 * @throws {TypeError} On non-string id, password, new password or new password confirmation
 * @throws {ContentError} On empty password, new password or new password confirmation
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */
module.exports = (userId, password, newPassword, newPasswordConfirmation) => {
    validateId(userId)
    validateNewPassword(newPassword, 'new password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')

    if (newPassword === password) throw new ContentError('new password is the same as old password')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            if (password !== user.password) throw new AuthError('password is not correct')

            return User.updateOne({ '_id': userId }, { password: newPassword })
        })
}