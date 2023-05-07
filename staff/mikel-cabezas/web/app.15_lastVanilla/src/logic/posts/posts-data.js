import { findUserById } from '../helpers/data-managers.js'
import { saveUser, savePost } from '../../data.js'
import { validateId, validatePost, validateLikePostIconTarget, validateTotalPostLikesTarget } from '../helpers/validators.js'
export function savePostToFavorites(userId, article, thisEvent) {
    validateId(userId)
    const currentUser = findUserById(userId)
    const indexFavPost = currentUser.likedPosts.findIndex(post => post === article.id)
    const findFavPost = currentUser.likedPosts.find(post => post === article.id)

    if(thisEvent.target.classList.contains('filled')) {
        thisEvent.target.classList.remove('filled')
        currentUser.likedPosts.splice(indexFavPost, 1)
    } else {
        if(!findFavPost) {
            thisEvent.target.classList.add('filled')
            currentUser.likedPosts.push(article.id)
        }
    }
    saveUser(currentUser)
}

export function userLikedPost(userId, article, thisEvent) {
    validateId(userId)
    validatePost(article.id)
    validateLikePostIconTarget(article.id)
    validateTotalPostLikesTarget(article.id)
    const indexLikedPost = article.likes.findIndex(user => user === userId)
    if(thisEvent.target.classList.contains('filled')) {
        thisEvent.target.classList.remove('filled')
        article.likes.splice(indexLikedPost, 1)
    } else {
        thisEvent.target.classList.add('filled')
        if (article.likes.length === 0) {
            article.likes.push(userId)
        } else if (article.likes.length > 0) {
            article.likes.push(userId)
        }
    }
    savePost(article)
}