import { savePost, findUserById, findPostById } from "../data.js";
import { validateId, validatePostId, validateCallback } from "./helpers/validators.js";

export default function toggleLikePost(userId, postId, callback) {
    validateId(userId)
    validatePostId(postId)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error('post not found'))

                return
            }
            const index = post.likes.indexOf(userId)

                if (index < 0) {
                    post.likes.push(userId)
                } else {
                    post.likes.splice(index, 1)

                    if (!post.likes.length) delete post.likes
                }
            
            
            savePost(post, () => callback(null))
        })
    })
}