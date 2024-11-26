import { savePosts, loadPosts, saveUsers, loadUsers } from "../data.js";
import { findUserById, findPostById } from "../data.js";
import { validateId, validatePostId, validateCallback } from "./helpers/validators.js";

export default function deletePost(userId, postId, callback) {
    validateId(userId)
    validatePostId(postId)
    validateCallback(callback)



    findPostById(postId, post => {
        if (!post) {
            callback(new Error('postId not found'))

            return
        }

        if (post.author !== userId) {
            callback(new Error('only author can delete this post'))

            return
        }

        loadPosts(posts => {
            const index = posts.findIndex(post => post.id === postId)

            posts.splice(index, 1)

            savePosts(posts, () => callback(null))

        })
        findUserById(userId, user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }
        })
        loadUsers(users => {
            users.forEach((user) => user.favs?.splice((user.favs.findIndex((favs) => favs === post.id), 1)))

            saveUsers(users, () => callback(null))
        })

    })
}
