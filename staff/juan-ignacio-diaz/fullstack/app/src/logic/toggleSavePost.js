import { validators } from 'com'
const { validateId, validateCallback } = validators

import { saveUser, findUserById, findPostById } from "../data"

export default function toggleSavePost(userId, postId, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateCallback(callback)
    
    findUserById(userId, user => {
        if (!user) {
            callback(new Error("Error to user"))

            return
        }
        
        findPostById(postId, post =>{
            if (!post) {
                callback(new Error(`post with id ${postId} not found`))
            
                return
            }

            const index = user.favs.indexOf(postId)

            if (index < 0)
                user.favs.push(postId)
            else {
                user.favs.splice(index, 1)
            } 
     
            saveUser(user, () => callback(null))
        })
    })

}