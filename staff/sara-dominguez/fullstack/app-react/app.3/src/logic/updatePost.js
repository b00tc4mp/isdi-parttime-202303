// TODO steps
// - input validations
// - verify user exists in database
// - verify post exists
// - verify post belongs to user (post.author === userId)
// - modify post with new data
// - save posts

import { savePost, findUserById, findPostById } from "../data.js";
// import { validateId, validatePostId, validatePostUrl, validateText, validateCallback } from "./helpers/validators.js";
import { validators } from 'com'

const { validateId, validatePostId, validatePostUrl, validateText, validateCallback } = validators

export function updatePost(userId, postId, imageUrl, text, callback) {
    validateId(userId)
    validatePostId(postId)
    validatePostUrl(imageUrl)
    validateText(text)
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

            if (post.author !== userId) {
                callback(new Error(`post with id ${postId} does not belong to user with id ${userId}`))

                return
            }

            else {
                post.image = imageUrl;
                post.text = text;
                post.date = new Date()

                savePost(post, () => callback(null))
            }

        })
    })
}
