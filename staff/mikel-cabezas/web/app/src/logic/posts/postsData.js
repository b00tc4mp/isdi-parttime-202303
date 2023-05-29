import { saveUser, savePost, findUserById } from '../../data.js'
import { validateId, validatePost } from '../helpers/validators.js'
import retrievePostByPostId from './retrievePostByPostId.js'
import retrieveUser from '../users/retrieveUser.js'


export function savePostToFavorites(article, userId, user, callback) {
    validateId(userId)
    

    findUserById
    findUserById(userId, user => {
        const indexFavPost = user.likedPosts.findIndex(post => post === article.id)
        const findFavPost = user.likedPosts.find(post => post === article.id)
        if(findFavPost) {
            user.likedPosts.splice(indexFavPost, 1)
        } else {
            user.likedPosts.push(article.id)
        }
        saveUser(user, () => callback(null))
    })

}

export function userLikedPost(userId, article, callback) {
    validateId(userId)
    validatePost(article.id)

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