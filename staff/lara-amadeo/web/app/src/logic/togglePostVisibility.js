import { findUserbyId, savePostInStorage } from "../data";
import retrievePost from "./retrievePost";

export default function togglePostVisibility(userId, postId, callback){

    findUserbyId(userId, user => {
        if(!user){
            callback(new Error('User not found'))

            return
        }

        retrievePost(userId, postId, (error, post) => {
            if(error){
                generateToast({
                    message: error.message,
                    type: errorToast
                })
                console.log(error.stack)
                return
            }

            if(post.visibility === 'private'){
                post.visibility = 'public'
                savePostInStorage(post, () => callback(null))
            } else {
                post.visibility = 'private'
                savePostInStorage(post, () => callback(null))
            }
        })
    })
}