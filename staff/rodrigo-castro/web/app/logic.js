// logic
console.log('logic loaded')

import {checkNewUser, validateEmail, validateUrl, validateName, validatePassword} from './validators.js'
import {users} from './data.js'


export const registerNewUser = (userName, userEmail, userPassword) => {
    users.push({
        name: userName,
        email: userEmail,
        password: userPassword
    })
}

export const findUser = (userEmail) => {
    return  users.find(user => user.email === userEmail)
}

export const changeEmail = (userLogged, homePage, changeEmailMenu) => {
    var userPreviousEmail = homePage.querySelector('input[name=previous-email]').value
    var userNewEmail = homePage.querySelector('input[name=new-email]').value
    var userPassword = homePage.querySelector('input[name=change-email-pass]').value

    var foundUser = findUser(userLogged.email)

    if(userPreviousEmail !== foundUser.email) throw new Error('Email or password incorrect', {cause: "ownError"})

    checkNewUser(userNewEmail, users)

    validateEmail(userNewEmail)

    if(userPassword !== foundUser.password) throw new Error('Email or password incorrect2', {cause: "ownError"})

    userLogged.email = userNewEmail
    foundUser.email = userNewEmail
    changeEmailMenu.querySelector('.red-text').textContent = 'Email succesfully changed'
    changeEmailMenu.querySelector('.red-text').classList.add('green-text')
    changeEmailMenu.querySelector('form').reset()
}

export const changePassword = (userLogged, changePasswordMenu) => {
    var previousPassword = changePasswordMenu.querySelector('.previous-password').value
    var foundUser = findUser(userLogged.email)
    
    if (previousPassword !== foundUser.password) throw new Error('Your password is incorrect', {cause: "ownError"})

    var newPassword = changePasswordMenu.querySelector('.new-password').value

    if(newPassword.length < 8) throw new Error('Password must be at least 8 characters long', {cause: "ownError"})

    if(newPassword === previousPassword) throw new Error('New password must be different than previous', {cause: "ownError"})

    var newPasswordRepeated = changePasswordMenu.querySelector('.repeat-new-password').value

    if(newPasswordRepeated !== newPassword) throw new Error (`New passwords don't match`, {cause: "ownError"})

    userLogged.password = newPassword
    foundUser.password = newPassword
    
    changePasswordMenu.querySelector('.red-text').textContent = 'Password succesfully changed'
    changePasswordMenu.querySelector('.red-text').classList.add('green-text')
    changePasswordMenu.querySelector('form').reset()
}

export const updateUserAvatar = (userLogged, avatarUrl, avatarImg, changeAvatarForm) => {
    validateEmail(userLogged.email)
    validateUrl(avatarUrl, 'Avatar url')

    var foundUser = findUser(userLogged.email)

    if(!foundUser) throw new Error('User not found', {cause: "ownError"})

    foundUser.avatar = avatarUrl
    avatarImg.src = foundUser.avatar

    changeAvatarForm.reset()
}

export const registerUserFull = (userEmail, userName, userPassword) => {
    checkNewUser(userEmail, users)

    validateName(userName)

    validateEmail(userEmail)

    validatePassword(userPassword)

    registerNewUser(userName.trim(), userEmail, userPassword)
}

export const goToHomePage = (homePage, foundUser, avatarImg) => {
    homePage.classList.remove('off')
    homePage.querySelector('a[name=my-profile]').textContent =`${foundUser.name}`
    if(foundUser.avatar)
        avatarImg.src = foundUser.avatar
}

export const logIn = (foundUser, userPassword, homePage, avatarImg) => {
    if(foundUser === undefined || foundUser.password !== userPassword) throw new Error('Wrong email or password', {cause: "ownError"})
    goToHomePage(homePage, foundUser, avatarImg)
}