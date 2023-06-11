import { savePost } from '../../data.js'
import { validators } from 'com'
import retrievePostByPostId from './retrievePostByPostId.js'

const { validateUserId, validatePostId, validateCallback } = validators

export function toggleLikePost(userId, article, callback) {
    validateUserId(userId)
    validatePostId(article.id)
    validateCallback(callback)

    retrievePostByPostId(userId, article.id, (error, post) => {
        const indexLikedPost = post.likes.indexOf(userId)
        if (indexLikedPost < 0) {
            post.likes.push(userId)
        } else {
            post.likes.splice(indexLikedPost, 1)
        }
        savePost(post, () => callback(null))
    })
}

// TODO 