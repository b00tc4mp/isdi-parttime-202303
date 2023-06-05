import { validators } from 'com'
import { saveUser, findUserById } from '../data'

const { validatePassword, validateId, validateCallback } = validators

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    if (newPassword === password) throw new Error('new password equals old password')
    validatePassword(newPasswordConfirm, 'new password confirm')
    if (newPassword !== newPasswordConfirm) throw new Error('password confirmation mismatch')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (password !== user.password) {
            callback(new Error('wrong password'))

            return
        }

        user.password = newPassword

        saveUser(user, () => callback(null))
    })
}