import { findPostById, findUserById } from "../data.js"

import { validators } from 'com'
const { validateId, validateCallback } = validators


export default function retrievePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback, 'callback function')

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`User ${userId} not found`))

            return
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error(`Post ${postId} not found`))

                return
            }

            callback(null, post)

        })
    })
}