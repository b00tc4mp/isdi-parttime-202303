import { findUserById } from './helpers/data-managers.js'
import { validateEmail, checkNewUser } from './helpers/validators.js'
import { users, saveUser } from '../data.js'

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

    saveUser(foundUser)
}