import { validateEmail, validateName, validateNewPassword, validatePasswordConfirm, validatePassword } from './validators.js'
import { findUserByEmail, users } from './data.js'
import { context } from './ui.js'
// import { /*loggedUserName*/context } from './main.js'


export function addNewUser(name, email, password, passwordConfirm) {
    validateName(name)
    validateEmail(email)

    const foundUser = findUserByEmail(email)
    if (foundUser) throw new Error ('user already exists')
    
    validateNewPassword(password)
    validatePasswordConfirm(password, passwordConfirm)
    
    users.push({
        name: name,
        email: email,
        password: password,
        })
}

export function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    const foundUser = findUserByEmail(email)
    if (!foundUser) throw new Error('user not found')
    if (foundUser.password !== password) throw new Error('wrong password')
}

export function getLoggedUser(email) {
    validateEmail(email)
    //debugger
    const foundUser = findUserByEmail(email)
    if(!foundUser) throw new Error('user not found')

    const user = {
        name: foundUser.name,
        email: foundUser.email
    }

    //loggedUserName = foundUser.name
    
    return user
}

export function updateUserPassword(email, password, newPassword, newPasswordConfirmation) {
    const foundUser = findUserByEmail(email)
    if (!foundUser) throw new Error('user not found')
    if (password !== foundUser.password) throw new Error('old password is not correct')

    validateNewPassword(newPassword, 'new password')
    if (newPassword === password) throw new Error('new password is the same as old password')
    validatePasswordConfirm(newPassword, newPasswordConfirmation, 'new password confirmation', 'new password')

    foundUser.password = newPassword
}

export function updateUserEmail(email, newEmail, newEmailConfirmation, password) {
    const foundUser = findUserByEmail(email)
    const newEmailUserFound = findUserByEmail(newEmail)
    
    if (email !== context.userID) throw new Error('email does not correspond to acount email')
    if (!foundUser) throw new Error('user not found')
    if (email !== foundUser.email) throw new Error('email does not correspond to actual email')
    if (!newEmail.match(/\S+@\S+\.\S+/)) throw new Error('new email is not a valid adress')
    if (newEmailUserFound) throw new Error('new email already registered')
    if (newEmail !== newEmailConfirmation) throw new Error('new email confirmation is different than new email')
    if (password !== foundUser.password) throw new Error('incorrect password')
    
    foundUser.email = newEmail
    context.userID = newEmail
}

export function updateUsername(email, oldUsername, newUsername, password) {
    const foundUser = findUserByEmail(email)
    if (!foundUser) throw new Error('user not found')

    validateName(oldUsername, 'old username')
    if (oldUsername !== foundUser.name) throw new Error('old username is not correct')

    validateName(newUsername, 'new username')
    if (newUsername === oldUsername) throw new Error('new username is equal to old username')

    if (password !== foundUser.password) throw new Error('password is not correct')

    foundUser.name = newUsername
}

export function actualPasswordEyeToggle(container, passwordClass) {
    const password = container.querySelector(passwordClass)

    if (password.type === 'password') {
        password.type = 'text'
    } else {
        password.type = 'password'
    }
}