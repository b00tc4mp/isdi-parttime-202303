import { findUserById } from "./helpers/data-managers.js"
import { validateNewPassword, validatePasswordConfirm, validateId } from "./helpers/validators.js"
import { saveUser } from "../data.js"

export function updateUserPassword(userId, password, newPassword, newPasswordConfirmation) {
    validateId(userId)
    const user = findUserById(userId)
    if (!user) throw new Error('user not found')
    if (password !== user.password) throw new Error('old password is not correct')

    validateNewPassword(newPassword, 'new password')
    if (newPassword === password) throw new Error('new password is the same as old password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')

    user.password = newPassword
    saveUser(user)
}