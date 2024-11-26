
import { saveUser, savePost, findUserById } from '../../data.js'
import { validateId, validatePost, validateLikePostIconTarget, validateTotalPostLikesTarget } from '../helpers/validators.js'
export function savePostToFavorites(article, userId, user) {
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
    saveUser(user, error => {
        if(!user) {
            alert('User not found')
        }
    })
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
    } else {
        article.likes.push(userId)
    }
    savePost(article)
}