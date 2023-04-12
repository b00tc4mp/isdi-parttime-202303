import { users, posts } from '../../data.js'

export function newUserId() {
    let userId = 'user-1'

    const lastUser = users[users.length - 1]

    if (lastUser)
        userId = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

    return userId
}

export function findUserById(userId) {
    let foundUser

    for (const user of users) {
        if (user.id === userId) {
            foundUser = user

            break
        }
    }

    return foundUser
}

export function findUserByEmail(email) {
    let foundUser

    for (const user of users) {
        if (user.email === email) {
            foundUser = user

            break
        }
    }

    return foundUser
}

export function newPostId() {
    let postId = 'post-1'

    const lastPost = posts[posts.length - 1]

    if (lastPost)
        postId = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

    return postId
}