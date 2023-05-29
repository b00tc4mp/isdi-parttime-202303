import { saveUser, savePost, findUserById } from '../../data.js'
import { validateId, validatePost, validateLikePostIconTarget, validateTotalPostLikesTarget } from '../helpers/validators.js'
export function savePostToFavorites(article, userId, user, callback) {
    validateId(userId)
    const indexFavPost = user.likedPosts.findIndex(post => post === article.id)
    const findFavPost = user.likedPosts.find(post => post === article.id)

    if(findFavPost) {
        user.likedPosts.splice(indexFavPost, 1)
    } else {
        if(!findFavPost) {
            user.likedPosts.push(article.id)
        }
    }
    saveUser(user, () => callback(null))
}

export function userLikedPost(userId, article, callback) {
    validateId(userId)
    validatePost(article.id)
    validateLikePostIconTarget(article.id)
    validateTotalPostLikesTarget(article.id)

    const indexLikedPost = article.likes.findIndex(user => user === userId)
    const userLikedPost = article.likes.find(user => user === userId)
    if(userLikedPost) {
        article.likes.splice(indexLikedPost, 1)
    } else {
        article.likes.push(userId)
    }
    savePost(article, () => callback(null))
}

// TODO 
// usar logicas para retrieve user y post