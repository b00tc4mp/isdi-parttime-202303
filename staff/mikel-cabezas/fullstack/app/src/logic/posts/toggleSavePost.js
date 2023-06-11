import { saveUser, findUserById, findPostbyId } from '../../data.js'
import { validators } from 'com'

const { validateUserId, validatePostId, validateCallback } = validators

export function toggleSavePost(userId, postId, callback) {
    validateUserId(userId)
    validatePostId(postId)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User with id ${userId} not found`))

            return
        }

        findPostbyId(postId, post => {
            if (!post) {
                callback(new Error(`Post with id ${postId} not found`))

                return
            }
            const indexFavPost = user.favPosts.indexOf(postId)

            if (indexFavPost < 0) {
                user.favPosts.push(postId)
            } else {
                user.favPosts.splice(indexFavPost, 1)
            }
            saveUser(user, () => callback(null))

        })

    })
}