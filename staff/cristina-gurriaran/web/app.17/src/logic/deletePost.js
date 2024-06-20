import { validateId, validateCallback } from './helpers/validators'
import { findUserById, findPostById } from '../data'
import { savePosts, loadPosts } from '../data'

export default function deletePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)

    findUserById(userId , user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))
            return
        } 
        
        findPostById(postId, post =>{
            if (!post){
                callback(new Error(`post with id ${postId} not found`))
                return
                }
            
            if (post.author !== userId){
                callback( new Error(`post with id ${postId} does not belong to user with id ${userId}`))
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