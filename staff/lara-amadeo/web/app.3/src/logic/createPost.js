import { posts, savePostsInStorage } from "../data"
import { findUserbyId } from "./helpers/data-managers"

/**
 * Creates a post with the params given
 * @param {string} userId user's id
 * @param {url} image post's image url
 * @param {string} text post's caption
 * 
 */

export default function createPost(userId, image, text) {

    const user = findUserbyId(userId)

    if (!user) throw new Error(`User with id ${userId} not found`)

    const _posts = posts()

    let newPost = {}
    if(_posts.length === 0) {
        newPost = {
            id: 'post-1',
            author: userId,
            image,
            text,
            date: new Date
        }
    } else {
        const lastPostId = _posts[_posts.length - 1].id
        const newPostId = 'post-' + (Number((lastPostId).slice(5)) + 1)
    
        newPost = {
            id: newPostId,
            author: userId,
            image,
            text,
            date: new Date
        }
    }

    _posts.push(newPost)
    savePostsInStorage(_posts)
}