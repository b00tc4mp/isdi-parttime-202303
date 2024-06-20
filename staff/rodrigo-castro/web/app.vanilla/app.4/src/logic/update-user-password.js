import { validateId, validatePassword } from './helpers/validators.js'
import { findUserById } from './helpers/data-managers.js'

export const changePassword = (userId, changePasswordMenu) => {
    var previousPassword = changePasswordMenu.querySelector('.previous-password').value
    var newPassword = changePasswordMenu.querySelector('.new-password').value
    var newPasswordRepeated = changePasswordMenu.querySelector('.repeat-new-password').value
    
    
    validateId(userId)
    validatePassword(previousPassword)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordRepeated, 'new password confirm')
    
    var foundUser = findUserById(userId)
    
    if (previousPassword !== foundUser.password) throw new Error('Your password is incorrect', {cause: "ownError"})


    if(newPassword.length < 8) throw new Error('Password must be at least 8 characters long', {cause: "ownError"})

    if(newPassword === previousPassword) throw new Error('New password must be different than previous', {cause: "ownError"})


    if(newPasswordRepeated !== newPassword) throw new Error (`New passwords don't match`, {cause: "ownError"})

    foundUser.password = newPassword
    
    changePasswordMenu.querySelector('.red-text').textContent = 'Password succesfully changed'
    changePasswordMenu.querySelector('.red-text').classList.add('green-text')
    changePasswordMenu.querySelector('form').reset()
}
