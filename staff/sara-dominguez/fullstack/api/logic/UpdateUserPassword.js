const { validators: { validateId, validatePassword, validateUserConfirmNewPassword, validateCallback } } = require('com')
const { User } = require('../data/models')

module.exports = function updateUserPassword(
    userId,
    password,
    userNewPassword,
    userConfirmNewPassword,
    callback
) {
    validateId(userId)
    validatePassword(userNewPassword)
    validateUserConfirmNewPassword(userConfirmNewPassword)
    validateCallback(callback)

    if (userNewPassword !== newPasswordConfirm) {
        throw new Error('New password and confirm must be the same')
    }

    if (userNewPassword !== password) {
        throw new Error('New password must be different from the current password')
    }

    return User.findById(userId)
        .then(user => {
            user.password = userNewPassword

            return User.updateOne({ _id: user.id }, { $set: { password: user.password } })
        })


}