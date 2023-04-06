import {users, posts} from "./data.js"
import {validateId, validateEmail, validateName, validatePassword, validateUrl} from "./validators.js"

export function registerUser (name, email, password) {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
    
    if (findUserByEmail(email)) 
        throw new Error("user already exists")

    users.push ({
        id: newUserId(),
        name: name,
        email: email,
        password: password
    })
}

export function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    const foundUser = findUserByEmail(email)

    if (!foundUser || foundUser.password !== password) 
        throw new Error("wrong email or password")
    
    return foundUser.id
}

export function updateUserAvatar(userId, avatar) {
    validateId(userId)
    validateUrl(avatar, 'avatar url')

    const foundUser = findUserById(userId)

    if (!foundUser)
        throw new Error('user not found')

    foundUser.avatar = avatar
}

export function updateUserPassword(userId, password, newPassword, newPasswordConfirm) {
    validateId(userId)
    validatePassword(password)
    validatePassword(newPassword, 'new password')
    validatePassword(newPasswordConfirm, 'new password confirm')

    if (newPassword === password) throw new Error("the new password is equal to the old password", {cause: "newPassword"})

    if (newPassword !== newPasswordConfirm) throw new Error("the confirm password is different than then new password", {cause: "newPasswordConfirm"})

    const foundUser = findUserById(userId)

    if (!foundUser) throw new Error("Error to user")
    if (foundUser.password !== password)  throw new Error("Error the pasword is invalid", {cause: "password"})

    foundUser.password = newPassword
}

export function retrieveUser(userId) {
    validateId(userId)

    const foundUser = findUserById(userId)
    if (!foundUser) throw new Error("Error to user")
   
    const user = {
        id: foundUser.id,
        name: foundUser.name,
    }

    if (foundUser.avatar)
        user.avatar = foundUser.avatar

    return user
}

//helpers

function newUserId() {
    let userId = 'user-1'

    const lastUser = users[users.length - 1]

    if (lastUser)
        userId = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

    return userId
}

function findUserById(userId) {
    let foundUser

    for (const user of users) {
        if (user.id === userId) {
            foundUser = user

            break
        }
    }

    return foundUser
}

function findUserByEmail(email) {
    let foundUser

    for (const user of users) {
        if (user.email === email) {
            foundUser = user

            break
        }
    }

    return foundUser
}