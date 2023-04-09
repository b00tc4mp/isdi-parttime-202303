// logic
console.log('logic loaded')

import { checkNewUser, validateEmail, validateUrl, validateName, validatePassword, validateId } from './validators.js'
import { context } from './ui.js'
import { users } from './data.js'


export const registerNewUser = (userName, userEmail, userPassword, id) => {
    users.push({
        id,
        name: userName,
        email: userEmail,
        password: userPassword
    })
}

export const findUserById = (userId) => {
    return  users.find(user => user.id === userId)
}

export const findUser = (userEmail) => {
    return  users.find(user => user.email === userEmail)
}

export const changeEmail = (userId, homePage, changeEmailMenu) => {
    var userPreviousEmail = homePage.querySelector('input[name=previous-email]').value
    var userNewEmail = homePage.querySelector('input[name=new-email]').value
    var userPassword = homePage.querySelector('input[name=change-email-pass]').value

    var foundUser = findUserById(userId)

    if(userPreviousEmail !== foundUser.email) throw new Error('Email or password incorrect', {cause: "ownError"})

    checkNewUser(userNewEmail, users)

    validateEmail(userNewEmail)

    if(userPassword !== foundUser.password) throw new Error('Email or password incorrect2', {cause: "ownError"})

    foundUser.email = userNewEmail
    changeEmailMenu.querySelector('.red-text').textContent = 'Email succesfully changed'
    changeEmailMenu.querySelector('.red-text').classList.add('green-text')
    changeEmailMenu.querySelector('form').reset()
}

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

export const updateUserAvatar = (userId, avatarUrl, avatarImg, changeAvatarForm) => {
    validateId(userId, 'user id')
    validateUrl(avatarUrl, 'Avatar url')

    var foundUser = findUserById(userId)

    if(!foundUser) throw new Error('Something went wrong. User not found', {cause: "ownError"})

    foundUser.avatar = avatarUrl
    avatarImg.src = foundUser.avatar

    changeAvatarForm.reset()
}

export const registerUserFull = (userEmail, userName, userPassword) => {
    checkNewUser(userEmail, users)

    validateName(userName)

    validateEmail(userEmail)

    validatePassword(userPassword)

    const lastUser = users[users.length - 1]

    let id = 'user-1'

    if(lastUser)
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

    registerNewUser(userName.trim(), userEmail, userPassword, id)
}

export const goToHomePage = (homePage, foundUser, avatarImg) => {
    homePage.classList.remove('off')
    homePage.querySelector('a[name=my-profile]').textContent =`${foundUser.name}`
    if(foundUser.avatar)
        avatarImg.src = foundUser.avatar
}

export const authenticateUser = (userEmail, userPassword, homePage, avatarImg) => {
    validateEmail(userEmail)
    validatePassword(userPassword)

    const foundUser = findUser(userEmail)
    
    if(foundUser === undefined || foundUser.password !== userPassword) throw new Error('Wrong email or password', {cause: "ownError"})
    
    goToHomePage(homePage, foundUser, avatarImg)

    return foundUser.id
}

export const retrieveUser = (userId) => {
    validateId(userId, 'user id')

    const foundUser = findUserById(userId)

    if(!foundUser) throw new Error('User not found')

    const user = {
        name: foundUser.name
    }

    if (foundUser.avatar)
        user.avatar = foundUser.avatar

    return user

}