import { findUserbyId, loadPosts, savePostInStorage, findPostById } from "../data"

/**
 * 
 * @param {string} postId post's id
 * @param {URL} image post's image
 * @param {string} text post's caption 
 */

export default function updatePost(userId ,postId, image, text, callback) {

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

            if(post.author !== userId){
                callback(new Error(`Post with id ${post.id} does not belong to user with id ${user.id}`))
                return
            }

            loadPosts(posts => {

                const post = posts.find(post => post.id === postId)
            
                post.image = image ? image : post.image
                post.text = text
            
                savePostInStorage(post, () => callback(null))
            })
        })
    })

    
}