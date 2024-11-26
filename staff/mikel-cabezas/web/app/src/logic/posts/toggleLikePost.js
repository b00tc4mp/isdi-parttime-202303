import { savePost } from '../../data.js'
import { validateUserId, validatePostId, validateCallback } from '../helpers/validators.js'
import retrievePostByPostId from './retrievePostByPostId.js'

export function toggleLikePost(userId, article, callback) {
    validateUserId(userId)
    validatePostId(article.id)
    validateCallback(callback)

    retrievePostByPostId(userId, article.id, (error, post) => {
        const indexLikedPost = post.likes.indexOf(userId)
        if(indexLikedPost < 0) {
            post.likes.push(userId)
        } else {
            post.likes.splice(indexLikedPost, 1)
        }
        savePost(post, () => callback(null))
    })
}

// TODO 