import { validateCallback, validateNewPassword, validateUserId } from '../helpers/validators.js'
import { findUserById, saveUser } from "../../data.js"

export function updateUserPassword(userId, currentPassword, newPassword, repeatPassword, callback) {

    validateUserId(userId)
    validateCallback(callback)
    findUserById(userId, user => {
        debugger
        if(!user) {
            callback(new Error ('user not found'))
            validateNewPassword(user, currentPassword.value, newPassword.value, repeatPassword.value)
            
            return
        }
        user.password = newPassword.value
        saveUser(user, () => callback(null))
    })
    // return true
}