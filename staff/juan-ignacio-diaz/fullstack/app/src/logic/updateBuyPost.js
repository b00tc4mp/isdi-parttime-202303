import { validators } from 'com'
const { validateId, validateCallback } = validators

import { savePost, findUserById, findPostById } from '../data'

export default function updateBuyPost(userId, postId, callback) {
    validateId(userId)
    validateId(postId)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('Error to user'))

            return
        }

        findPostById(postId, post =>{
            if (!post) {
                callback(new Error(`post with id ${postId} not found`))
    
                return
            }
    
            post.author = userId
            post.price = 0
    
            savePost(post, () => callback(null))  
        })
    })
}