import { validateId, validatePassword, validateCallback } from './helpers/validators'
import { saveUser, findUserById } from '../data'

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm, callback) {
    validateId(userId)
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')
    validateCallback(callback)

    if (newPassword === password) throw new Error("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (user.password !== password) {
            callback(new Error("Error the pasword is invalid", {cause: "password"}))

            return
        }

        user.password = newPassword

        saveUser(user, () => callback(null))
    })
}