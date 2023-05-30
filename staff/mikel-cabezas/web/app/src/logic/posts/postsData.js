import { saveUser, savePost, findUserById, findPostbyId } from '../../data.js'
import { validateUserId, validatePostId, validateCallback } from '../helpers/validators.js'
import retrievePostByPostId from './retrievePostByPostId.js'
import retrieveUser from '../users/retrieveUser.js'


export function savePostToFavorites(userId, postId, callback) {
    validateUserId(userId)
    validatePostId(postId)
    validateCallback(callback)
    
    findUserById(userId, user => {
        if(!user) {
            callback(new Error(`User with id ${userId} not found`))
            
            return
        }

        findPostbyId(postId, post => {
            if(!post) {
                callback(new Error(`Post with id ${postId} not found`))
                
                return
            }
            const indexFavPost = user.favPosts.indexOf(postId)

            if(indexFavPost < 0) {
                user.favPosts.push(postId)
            } else {
                user.favPosts.splice(indexFavPost, 1)
            }
            saveUser(user, () => callback(null))

        })
        
    })



}

export function userLikedPost(userId, article, callback) {
    validateUserId(userId)
    validatePostId(article.id)

    retrievePostByPostId(userId, article.id, (error, post) => {
        const indexLikedPost = post.likes.findIndex(user => user === userId)
        const userLikedPost = post.likes.find(user => user === userId)
        if(userLikedPost) {
            post.likes.splice(indexLikedPost, 1)
        } else {
            post.likes.push(userId)
        }
        savePost(post, () => callback(null))
    })
 
}

// TODO 