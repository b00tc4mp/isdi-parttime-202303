import { saveUserInStorage, findUserbyId, findPostById } from "../data"

/**
 * Toggles save or unsave a post
 * @param {object} post a post
 * @param {string} userId user's id
 */
//toggle rename -> toggleSavePost
export default function saveAndUnsavePost(postId, userId, callback){

    findUserbyId(userId, user => {
       
        if(!user){
            callback(new Error('User not found'))
            return
        }

        findPostById(postId, post => {

            if(user.savedPosts){
    
                const postAlreadySavedByUser = user.savedPosts.includes(post.id)
        
                if(!postAlreadySavedByUser){
                    user.savedPosts.push(post.id)
                    saveUserInStorage(user, () => callback(null))
                } else {
                    const index = user.savedPosts.findIndex(elem => elem === post.id)
                    user.savedPosts.splice(index, 1)
                    saveUserInStorage(user, () => callback(null))
                }
            } else {
                user.savedPosts = []
        
                user.savedPosts.push(post.id)
                saveUserInStorage(user, () => callback(null))
            }
        })
    }  
)}