import { validateNewPassword } from '../helpers/validators.js'
import { findUserById, saveUser } from "../../data.js"

export function updateUserPassword(userId, currentPassword, newPassword, repeatPassword) {

    findUserById(userId, (error, user) => {
        if(error) {
            callback(new Error ('user not found'))
            
            return
        }
        validateNewPassword(currentPassword.value, newPassword.value, repeatPassword.value, user)
        user.password = newPassword.value
        saveUser(user, () => callback(null))
    })

    return true
}