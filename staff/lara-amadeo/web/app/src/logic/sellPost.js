import { findPostById, findUserbyId, savePostInStorage } from "../data";

export default function sellPost(userId, postId, actualPrice, newPrice, callback){
    
    findUserbyId(userId, user => {

        if(!user){
            callback(new Error('User not found'))

            return
        }

        findPostById(postId, post => {
            if(!post){
                callback(new Error('Post not found'))

                return
            }

            if(actualPrice === newPrice){
                callback(new Error('Price should be different to previous one'))

                return
            }

            if(newPrice < 0){
                callback(new Error('Price must be higher than 0'))

                return
            }

            if(newPrice > 1000){
                callback(new Error('Price must be lower than 1000'))

                return
            }

            post.price = newPrice
            savePostInStorage(post, () => callback(null))
        })
    })
}