import { validators } from 'com'
const { validateNewPassword, validatePasswordConfirm, validateId, validateCallback } = validators

import { saveUser, findUserById } from "../data"

export function updateUserPassword(userId, password, newPassword, newPasswordConfirmation, callback) {
    validateId(userId)
    validateNewPassword(newPassword, 'new password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')
    validateCallback(callback)

    if (newPassword === password) throw new Error('new password is the same as old password')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (password !== user.password) {
            callback(new Error('old password is not correct'))

            return
        }

        user.password = newPassword

        saveUser(user, () => callback(null))
    })
}