import { saveUserInStorage, findUserbyId } from "../data"

/**
 * Places new password in user's database
 * @param {string} userId user's id
 * @param {string} currentPassword user's current password
 * @param {string} newPassword user's new password
 * @param {string} confirmNewPassword confirmation of new password
 */

export const updatePassword = (userId, currentPassword, newPassword, confirmNewPassword, callback) => {

    if (currentPassword === newPassword)
        throw new Error('Current password cannot be the same as new password')

    if (newPassword !== confirmNewPassword)
        throw new Error('New passwords do not match')

    findUserbyId(userId, user => {
        if (!user){
            callback(new Error('User not found'))
            return
        }

        if (currentPassword !== user.password){
            callback(new Error('Invalid current password'))
            return
        }
        
        user.password = newPassword

        saveUserInStorage(user, () => callback(null))
    }) 
 }
