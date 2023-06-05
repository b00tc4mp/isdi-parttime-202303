import { validators } from 'com'
const { validateId, validateCallback } = validators

import { findPostById, findUserById } from "../data"

export default function retriewePost(userId, postId, callback){
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)
    
    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error(`post with id ${postId} not found`))
    
                return
            }
    
            callback(null, post)
        })

    })
}