import { saveUserInStorage } from "../data"
import { findUserbyId } from "./helpers/data-managers"

/**
 * Places new password in user's database
 * @param {string} userId user's id
 * @param {string} currentPassword user's current password
 * @param {string} newPassword user's new password
 * @param {string} confirmNewPassword confirmation of new password
 */

export const updatePassword = (userId, currentPassword, newPassword, confirmNewPassword) => {

    const user = findUserbyId(userId)

    if (!user)
        throw new Error('User not found')

    if (currentPassword !== user.password)
        throw new Error('Invalid current password')

    if (currentPassword === newPassword)
        throw new Error('Current password cannot be the same as new password')

    if (newPassword !== confirmNewPassword)
        throw new Error('New passwords do not match')

    user.password = newPassword

    saveUserInStorage(user)
 }
