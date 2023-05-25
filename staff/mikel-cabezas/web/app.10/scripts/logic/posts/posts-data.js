import { findUserById } from '../helpers/data-managers.js'
import { saveUsers, savePosts } from '../../data.js'
import { renderPosts } from '../render-posts.js'
export function savePostToFavorites(article, favoritePost, userId) {
    if(!userId) {
        throw new Error('Invalid userId')
    }
    if(!article) {
        throw new Error('Invalid article')
    }
    if(!favoritePost) {
        throw new Error('Invalid invalid input source')
    }

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
    saveUsers()
    renderPosts(userId)
}

export function userLikedPost(userId, article, likePost, totalLikesPost) {
    if(!userId) {
        throw new Error('Invalid userId')
    }
    if(!article) {
        throw new Error('Invalid article')
    }
    if(!likePost) {
        throw new Error('Invalid invalid input source')
    }
    if(!totalLikesPost) {
        throw new Error('Invalid invalid output source')
    }
    const indexLikedPost = article.likes.findIndex(user => user === userId)
    if(likePost.classList.contains('filled')) {
        likePost.classList.remove('filled')
        article.likes.splice(indexLikedPost, 1)
        if (article.likes.length === 0) {
            totalLikesPost.innerText = ''
        }
        if (article.likes.length === 1) {
            totalLikesPost.innerText = article.likes.length + ' like'
        }
        if (article.likes.length > 1) {
            totalLikesPost.innerText = article.likes.length + ' likes'
        }
    } else {
        likePost.classList.add('filled')
        if (article.likes.length > 0) {
            article.likes.push(userId)
            totalLikesPost.innerText = article.likes.length + ' likes'
        }
        if (article.likes.length === 0) {
            article.likes.push(userId)
            totalLikesPost.innerText = article.likes.length + ' like'
        }
    }
    savePosts()
    renderPosts(userId)
}