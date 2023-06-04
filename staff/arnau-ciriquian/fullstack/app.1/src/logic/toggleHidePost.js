import { findPostById, findUserById, savePost } from "../data";
import { validateCallback, validateId } from "./helpers/validators";

export default function toggleHidePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user not found`))

            return
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error('post not found'))
    
                return
            }

            if (post.hidden === false) {
                post.hidden = true
            } else {
                post.hidden = false
            }

            savePost(post, () => callback(null))
        })
    })
}