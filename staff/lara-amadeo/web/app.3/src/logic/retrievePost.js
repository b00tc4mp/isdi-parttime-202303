import { posts, users } from "../data"

/**
 * Returns a post searched by id
 * @param {string} userId user's id
 * @param {string} postId post's id
 * @returns {object} the founded post
 */

export default function retrievePost(userId, postId){
    //validateId

    const foundUser = users().some(user => user.id === userId)

    if (!foundUser) throw new Error('User not found')

    const _posts = posts()
    const post = _posts.find(post => post.id === postId)

    if(!post) throw new Error('Post not found')

    return post
}