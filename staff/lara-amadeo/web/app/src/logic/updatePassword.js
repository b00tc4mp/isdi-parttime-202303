import { findUserbyId } from "./helpers/data-managers.js"

export const updatePassword = (userId, currentPassword, newPassword, confirmNewPassword) => {

    const foundUser = findUserbyId(userId)

    if (!foundUser)
        throw new Error('User not found')

    if (currentPassword !== foundUser.password)
        throw new Error('Invalid current password')

    if (currentPassword === newPassword)
        throw new Error('Current password cannot be the same as new password')

    if (newPassword !== confirmNewPassword)
        throw new Error('New passwords do not match')

    foundUser.password = newPassword
 }
