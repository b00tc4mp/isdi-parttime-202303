console.log('load data managers')

import { users, posts } from "../../data"

export const findUserById = (userId) => {
    return  users().find(user => user.id === userId)
}

export const findUser = (userEmail) => {
    return  users().find(user => user.email === userEmail)
}

export const findPostById = (postId) => {
    return posts().find(post => post.id === postId)
}