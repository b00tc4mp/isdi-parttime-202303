import { validateId, validatePassword } from './helpers/validators.js'
import { findUserById } from './helpers/data-managers.js'
import { saveUsers } from '../data.js'

export default function updateUserPassword(userId, password, newPassword, newPasswordConfirm) {
    validateId(userId)
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    if (newPassword === password) throw new Error("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    const user = findUserById(userId)

    if (!user) throw new Error("Error to user")
    if (user.password !== password)  throw new Error("Error the pasword is invalid", {cause: "password"})

    user.password = newPassword

    saveUsers()
}