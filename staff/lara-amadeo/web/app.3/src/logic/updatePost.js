import { posts, savePostInStorage } from "../data"

/**
 * 
 * @param {string} postId post's id
 * @param {URL} image post's image
 * @param {string} text post's caption 
 */

export default function updatePost(postId, image, text) {
    const _posts = posts()
    const post = _posts.find(post => post.id === postId)

    post.image = image ? image : post.image
    post.text = text

    savePostInStorage(post)
}