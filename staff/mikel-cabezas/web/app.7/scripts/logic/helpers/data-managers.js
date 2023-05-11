import { users } from "../../data.js";
import { context } from "../../ui.js";

export function findUserByEmail (email) {
    let foundUser
    users.forEach(user => {
        if (user.email === email) {
            foundUser = user.email
        }
    })
    return foundUser
}

export function findUserById (userId) {
    let foundUser
    users.forEach(user => {
        if (user.id === userId) {
            foundUser = user
        }
    })
    return foundUser
}

export function getUserName(userId) {

    let foundUser
    users.forEach(user => {
        if (user.id === userId) {
            foundUser = user.name
        }
    })
    return foundUser
}


export function getCurrentUser(id) {
    const userID = context.userId
    if (userID !== -1) {
        // return id
        return userID
    }
}