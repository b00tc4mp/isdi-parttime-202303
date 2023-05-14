import { findUserById } from '../helpers/dataManagers.js'
import { saveUser, savePost } from '../../data.js'
import { validateId, validatePost, validateLikePostIconTarget, validateTotalPostLikesTarget } from '../helpers/validators.js'
export function savePostToFavorites(article, favoritePost, userId) {
    validateId(userId)
    const currentUser = findUserById(userId)
    const indexFavPost = currentUser.likedPosts.findIndex(post => post === article.id)
    const findFavPost = currentUser.likedPosts.find(post => post === article.id)

    if(findFavPost) {
        currentUser.likedPosts.splice(indexFavPost, 1)
    } else {
        if(!findFavPost) {
            currentUser.likedPosts.push(article.id)
        }
    }
    saveUser(currentUser)
}

export function userLikedPost(userId, article, likePostIcon, totalPostLikes) {
    validateId(userId)
    validatePost(article.id)
    validateLikePostIconTarget(article.id)
    validateTotalPostLikesTarget(article.id)

    const indexLikedPost = article.likes.findIndex(user => user === userId)
    const userLikedPost = article.likes.find(user => user === userId)
    if(userLikedPost) {
        article.likes.splice(indexLikedPost, 1)
        if (article.likes.length === 0) {
            totalPostLikes.innerText = ''
        }
        if (article.likes.length === 1) {
            totalPostLikes.innerText = article.likes.length + ' like'
        }
        if (article.likes.length > 1) {
            totalPostLikes.innerText = article.likes.length + ' likes'
        }
    } else {
        if (article.likes.length > 0) {
            article.likes.push(userId)
            totalPostLikes.innerText = article.likes.length + ' likes'
        }
        if (article.likes.length === 0) {
            article.likes.push(userId)
            totalPostLikes.innerText = article.likes.length + ' like'
        }
    }
    savePost(article)
}