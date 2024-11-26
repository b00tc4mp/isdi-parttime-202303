import { users, posts } from "../../data.js";
import { context } from "../../ui.js";

export function findUserByEmail (email) {
    let foundUser
    users().forEach(user => {
        if (user.email === email) {
            foundUser = user.email
        }
    })
    return foundUser
}

export function findUserById (userId) {
    let foundUser
    users().forEach(user => {
        if (user.id === userId) {
            foundUser = user
        }
    })
    return foundUser
}

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
export function getPostbyId(postId) {

    let foundUser
    posts().forEach(post => {
        if (post.id === postId) {
            foundUser = post
        }
    })
    return foundUser
}