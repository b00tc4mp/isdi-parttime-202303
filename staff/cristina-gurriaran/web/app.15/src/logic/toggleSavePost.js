import {validateId, validateCallback} from './helpers/validators'
import {findUserById, findPostById, saveUser} from '../data'




export default function toggleSavePost(userId, postId, callback) {

    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)


   findUserById(userId, user => {
    
        if (!user){
            callback(new Error(`user with id ${userId} not found`))
            return
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error(`user with id ${postId} not found`))
                return
            }

            if (!post.savedPosts) {
                post.savedPosts = [postId]
        
            } else {
        
                const index = post.savedPosts.indexOf(postId)
        
                if (index < 0) 
                    post.savedPosts.push(postId)
                else
                    post.savedPosts.splice(index, 1)
        
                    if (!post.savedPosts.length) delete post.savedPosts
                    
            }
        
            saveUser(user, () => callback(null))

        })
   })
}