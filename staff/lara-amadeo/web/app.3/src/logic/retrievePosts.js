import { posts } from '../data'

/**
 * Returns all the posts of the database in reverse order
 * @param {string} userId user's id
 * @returns {Array} posts in reverse order
 */

export default function retrievePosts(userId) {

    if(!userId) throw new Error ('User not found')
    
    const _posts = posts()
    return _posts.toReversed()
}