import { savePostInStorage, saveUserInStorage, findUserbyId } from "../data"
import retrievePost from "./retrievePost"

/**
 * Toggles the like or unlike for a post
 * @param {object} post A post object
 * @param {string} userId user's id
 */

export default function likeAndUnlike (postId, userId, callback) {

    findUserbyId(userId, user => {
        if(!user){
            callback(new Error('User not found'))

            return
        }

        retrievePost(userId, postId, (error, post) => {
            if(error){
                generateToast({
                    message: error.message + error.stack,
                    type: errorToast
                })
                return
            }

            const postAlreadyLikedByUser = user.likedPosts.includes(post.id)

            if(!postAlreadyLikedByUser){
    
                const likesInPost = post.likes
                if (likesInPost){
                    post.likes.push(userId)
                } else {
                    post.likes = []
                    post.likes.push(userId)
                }
    
                const likedPostsInUser = "likedPosts" in user
                if(likedPostsInUser){
                    user.likedPosts.push(post.id)
                    savePostInStorage(post, () => callback(null))
                    saveUserInStorage(user, () => callback(null))
                } else {
                    user.likedPosts = []
                    user.likedPosts.push(post.id)
                    savePostInStorage(post, () => callback(null))
                    saveUserInStorage(user, () => callback(null))
                }
                
            } else{
                const indexPostInUser = user.likedPosts.findIndex(elem => elem === post.id)
                user.likedPosts.splice(indexPostInUser, 1)
    
                const indexUserInPost = post.likes.findIndex(elem => elem.id === userId) 
                post.likes.splice(indexUserInPost, 1)
    
                savePostInStorage(post, () => callback(null))
                saveUserInStorage(user, () => callback(null))
            }

        })
    })


        
}



