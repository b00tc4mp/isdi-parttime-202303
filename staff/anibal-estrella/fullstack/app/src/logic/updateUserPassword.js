import { validators } from 'com'
const { validateId, validatePassword, validateCallback } = validators

import { findUserById, saveUser } from "../data"

/**
 * Updates user's password in database
 *
 * @param {string} userId The user's ID
 * @param {string} password The user's current password
 * @param {string} newPassword The user's new password
 * @param {string} newPasswordConfirm The user's new password
 */

export default (userId, password, newPassword, newPasswordConfirm, callback) => {
    validateId(userId, 'user id')
    validatePassword(password, 'password')

    if (newPassword === password) throw new Error('your new password match the old password, please try another')

    validatePassword(newPassword, 'new password confirmation')
    if (newPassword !== newPasswordConfirm) throw new Error('your new passwords don\'t match the confirmation')

    validateCallback(callback, 'callback function')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (password !== user.password) {
            callback(new Error('wrong password', { cause: 'userError' }))

            return
        }

        user.password = newPassword

        saveUser(user, () => callback(null))
    })
}