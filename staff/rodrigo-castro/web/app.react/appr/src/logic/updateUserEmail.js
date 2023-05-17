import { validateEmail, checkNewUser } from './helpers/validators'
import { loadUsers, saveUser, findUserById } from '../data'

export const changeEmail = (userId, userPreviousEmail, userNewEmail, userPassword) => {
    const foundUser = findUserById(userId)

    if(userPreviousEmail !== foundUser.email) throw new Error('Email or password incorrect', {cause: "ownError"})

    checkNewUser(userNewEmail, users)

    validateEmail(userNewEmail)

    if(userPassword !== foundUser.password) throw new Error('Email or password incorrect2', {cause: "ownError"})

    foundUser.email = userNewEmail
    // changeEmailMenu.querySelector('.red-text').textContent = 'Email succesfully changed'
    // changeEmailMenu.querySelector('.red-text').classList.add('green-text')
    // changeEmailMenu.querySelector('form').reset()

    saveUser(foundUser)
}