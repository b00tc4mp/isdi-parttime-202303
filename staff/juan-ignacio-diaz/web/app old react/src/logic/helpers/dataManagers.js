import { users, posts } from '../../data'

export function newUserId() {
    let userId = 'user-1'

    const tmpUser = users()
    const lastUser = tmpUser[tmpUser.length - 1]

    if (lastUser)
        userId = 'user-' + (parseInt(lastUser.id.slice(5)) + 1)

    return userId
}

export function findUserById(userId) {
    return users().find(user => user.id === userId)
}

export function findUserByEmail(email) {
    return users().find(user => user.email === email)
}

export function newPostId() {
    let postId = 'post-1'

    const tmpPost = posts()
    const lastPost = tmpPost[tmpPost.length - 1]

    if (lastPost)
        postId = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

    return postId
}

export function findPostById(postId) {
    return posts().find(post => post.id === postId)
}