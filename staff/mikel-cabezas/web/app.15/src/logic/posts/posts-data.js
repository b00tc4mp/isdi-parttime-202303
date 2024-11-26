import { findUserById } from '../helpers/data-managers.js'
import { saveUser, savePost } from '../../data.js'
// import { renderPosts } from './render-posts.js'
import { validateId, validatePost, validateLikePostIconTarget, validateTotalPostLikesTarget } from '../helpers/validators.js'
export function savePostToFavorites(article, favoritePost, userId) {
    validateId(userId)
    const currentUser = findUserById(userId)
    const indexFavPost = currentUser.likedPosts.findIndex(post => post === article.id)
    const findFavPost = currentUser.likedPosts.find(post => post === article.id)

    if(favoritePost.classList.contains('filled')) {
        favoritePost.classList.remove('filled')
        currentUser.likedPosts.splice(indexFavPost, 1)
    } else {
        if(!findFavPost) {
            favoritePost.classList.add('filled')
            currentUser.likedPosts.push(article.id)
        }
    }
    saveUser(currentUser)
    renderPosts(userId)
}

export function userLikedPost(userId, article, likePostIcon, totalPostLikes) {
    validateId(userId)
    validatePost(article.id)
    validateLikePostIconTarget(article.id)
    validateTotalPostLikesTarget(article.id)

    const indexLikedPost = article.likes.findIndex(user => user === userId)
    if(likePostIcon.classList.contains('filled')) {
        likePostIcon.classList.remove('filled')
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
        likePostIcon.classList.add('filled')
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
    // renderPosts(userId)
}