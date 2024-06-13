import { loadPosts, findUserById, findPostById, savePosts } from "../data";
import { validateId, validateCallback } from "./helpers/validators";

export function deletePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user not found`))

            return
        } 

        findPostById(postId, post => {
            if(!post) {
                callback(new Error('post not found'))

                return
            } 

            if (post.author !== userId) {
                callback(new Error(`post with id ${postId} does not belong to user with id ${userId}`))

                return
            } 

            loadPosts(posts => {
                const index = posts.findIndex(post => post.id === postId)

                posts.splice(index, 1)

                savePosts(posts, () => callback(null))
            })
        })
    })
}