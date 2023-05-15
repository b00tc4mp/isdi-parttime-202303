import { users, posts } from '../../data'

export function findUserByEmail(email) {
    // for (let i = 0; i < users.length; i++) {
    //     const user = users[i]

    //     if (user.email === email) return user
    // }

    return users().find(user => user.email === email)
}

export function findUserById(userId) {
    return users().find(user => user.id === userId)
}

export function findPostById(postId) {
    return posts().find(post => post.id === postId)
}