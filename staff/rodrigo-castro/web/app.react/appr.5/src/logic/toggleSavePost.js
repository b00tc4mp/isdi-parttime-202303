import { validateId } from './helpers/validators'
import { saveUser, findPostById, findUserById } from "../data"

export default (userId, postId, callback) => {    
    validateId(userId, 'user id')
    validateId(postId, 'post id')

    findUserById(userId, user => {
        if(!user){
            callback(new Error (`User id ${userId} not found`))
        }
    
        findPostById(postId, post => {
            if(!post){
                callback(new Error (`Post id ${postId} not found`))
            }
        
            if(!user.savedPosts){
                user.savedPosts = [postId]
            } else {
                const index = user.savedPosts.indexOf(postId)
        
                if(index < 0)
                    user.savedPosts.push(postId)
                else{
                    user.savedPosts.splice(index, 1)
        
                    if(!user.savedPosts.length) delete user.savedPosts
                }
            }
            saveUser(user, () => callback(null))
        })
    })
}