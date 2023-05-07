import { findUserById } from "../helpers/dataManagers.js"
import { validateNewPassword } from '../helpers/validators.js'
import { users, saveUser } from "../../data.js"

export function updateUserPassword(userId, currentPassword, newPassword, repeatPassword) {

    // const _users = users()
    const user = findUserById(userId)
    validateNewPassword(currentPassword.value, newPassword.value, repeatPassword.value, user)

    user.password = newPassword.value
    currentPassword.disabled = true
    newPassword.disabled = true
    repeatPassword.disabled = true
    saveUser(user)
}