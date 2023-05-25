import { posts } from "../../data.js";
import { context } from "../../ui.js";





export function getUserName(userId) {
    let foundUser
    users().forEach(user => {
        if (user.id === userId) {
            foundUser = user.name
        }
    })
    return foundUser
}

export function getUserImage(userId) {

    let foundUser
    users().forEach(user => {
        if (user.id === userId) {
            foundUser = user.image
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

export function getPostUserName(postUserId) {

    let foundUser
    users().forEach(user => {
        if (user.id === postUserId) {
            foundUser = user.name
        }
    })
    return foundUser
}

export function getPostUserImage(postUserId) {

    let foundUser
    users().forEach(user => {
        if (user.id === postUserId) {
            foundUser = user.image
        }
    })
    return foundUser
}
