import { findUserByEmail } from "./helpers/data-managers.js"
import { validateNewPassword, validatePasswordConfirm } from "./helpers/validators.js"

export function updateUserPassword(email, password, newPassword, newPasswordConfirmation) {
    const foundUser = findUserByEmail(email)
    if (!foundUser) throw new Error('user not found')
    if (password !== foundUser.password) throw new Error('old password is not correct')

    validateNewPassword(newPassword, 'new password')
    if (newPassword === password) throw new Error('new password is the same as old password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')

    foundUser.password = newPassword
}