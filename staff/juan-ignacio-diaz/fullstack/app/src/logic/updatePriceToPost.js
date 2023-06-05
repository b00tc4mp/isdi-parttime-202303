import { validators } from 'com'
const { validateId, validateCallback } = validators

import { savePost, findUserById, findPostById } from '../data'

export default function updatePost(userId, postId, price, callback) {
    validateId(userId)
    validateId(postId)
    validateCallback(callback)

    validateNumber(price)

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
    
            if (post.author !== userId) {
                callback(new Error('Error user and post do not match'))
    
                return
            }
    
            post.price = price
    
            savePost(post, () => callback(null))  
        })
    })
}