import { context, toggleOffClassInSection } from "../ui.js"
import { findUserById } from "./helpers/data-managers.js"
import { validateNewPassword } from './helpers/validators.js'
import { userAccount } from "../pages/user-account.js"

export function updateUserPassword(currentId) {
    const userId = context.userId
    const user = findUserById(userId)
    const currentPassword = userAccount.querySelector('form.user-password input.current-password')
    const newPassword = userAccount.querySelector('form.user-password input.new-password')
    const repeatPassword = userAccount.querySelector('form.user-password input.repeat-password')

    validateNewPassword(currentPassword.value, newPassword.value, repeatPassword.value, user)

    user.password = newPassword.value
    currentPassword.disabled = true
    newPassword.disabled = true
    repeatPassword.disabled = true
    userAccount.querySelector('.update-password form').reset()

    toggleOffClassInSection(userAccount.querySelector('form.data.user-password .buttons'))

    userAccount.querySelector('p.message').classList.remove('error')
    userAccount.querySelector('p.message').classList.add('success')
    
    return userAccount.querySelector('p.message').innerHTML = 'Password changed!'
}