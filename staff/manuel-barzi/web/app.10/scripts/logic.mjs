console.log('load logic')

import { validateName, validateEmail, validatePassword, validateUrl, validateId } from './validators.mjs'
import { users } from './data.mjs'

export function registerUser(name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)

    const foundUser = findUserByEmail(email)

    if (foundUser)
        throw new Error('user already exists')

    let id = 'user-1'

    const lastUser = users[users.length - 1]

    if (lastUser)
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

    const user = {
        id,
        name,
        email,
        password
    }

    users.push(user)
}

export function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    const foundUser = findUserByEmail(email)

    if (!foundUser)
        throw new Error('user not found')

    if (foundUser.password !== password)
        throw new Error('wrong password')

    return foundUser.id
}

export function retrieveUser(userId) {
    validateId(userId, 'user id')

    const foundUser = findUserById(userId)

    if (!foundUser)
        throw new Error('user not found')

    const user = {
        name: foundUser.name
    }

    if (foundUser.avatar)
        user.avatar = foundUser.avatar

    return user
}

export function updateUserAvatar(userId, avatar) {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')

    const foundUser = findUserById(userId)

    if (!foundUser)
        throw new Error('user not found')

    foundUser.avatar = avatar
}

export function updateUserPassword(userId, password, newPassword, newPasswordConfirm) {
    validateId(userId, 'user id')
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    const foundUser = findUserById(userId)

    if (!foundUser)
        throw new Error('user not found')

    if (password !== foundUser.password)
        throw new Error('wrong password')

    if (newPassword !== newPasswordConfirm)
        throw new Error('password confirmation mismatch')

    if (newPassword === password)
        throw new Error('new password equals old password')

    foundUser.password = newPassword
}

// helpers

function findUserByEmail(email) {
    let foundUser

    for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

    return foundUser
}

function findUserById(userId) {
    let foundUser

    for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if (user.id === userId) {
            foundUser = user

            break
        }
    }

    return foundUser
}