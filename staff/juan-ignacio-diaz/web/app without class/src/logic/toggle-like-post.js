import { findUserById, findPostById } from "./helpers/data-managers.js";
import { validateId } from "./helpers/validators.js";
import { savePost } from "../data.js"

export default function toggleLikePost(userId, postId) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    
    if (!findUserById(userId)) throw new Error("Error to user")

    const post = findPostById(postId)

    if (!post) throw new Error(`post with id ${postId} not found`)

    if (!post.likes) {
        post.likes = [userId]
    } else {
        const index = post.likes.indexOf(userId)

        if (index < 0)
            post.likes.push(userId)
        else {
            post.likes.splice(index, 1)

            if (!post.likes.length) delete post.likes
        } 
    }

    savePost(post)
}