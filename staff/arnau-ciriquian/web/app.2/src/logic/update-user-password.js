import { findUserById } from "./helpers/data-managers"
import { validateNewPassword, validatePasswordConfirm, validateId } from "./helpers/validators"
import { saveUsers } from "../data"

export function updateUserPassword(userId, password, newPassword, newPasswordConfirmation) {
    validateId(userId)
    const foundUser = findUserById(userId)
    if (!foundUser) throw new Error('user not found')
    if (password !== foundUser.password) throw new Error('old password is not correct')

    validateNewPassword(newPassword, 'new password')
    if (newPassword === password) throw new Error('new password is the same as old password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')

    foundUser.password = newPassword
    saveUsers()
}