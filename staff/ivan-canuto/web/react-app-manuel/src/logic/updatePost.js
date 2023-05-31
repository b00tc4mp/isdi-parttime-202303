import { validateId, validateUrl, validateText, validateCallback } from './helpers/validators'
import { savePost, findUserById, findPostById } from '../data'

export default function updatePost(userId, postId, image, text, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))

            return
        }

        findPostById(postId, post => {
            if (!post) {
                callback(new Error(`post with id ${postId} not found`))

                return
            }

            if (post.author !== userId) {
                callback(new Error(`post with id ${postId} does not belong to user with id ${userId}`))

                return
            }

            post.image = image
            post.text = text
            post.date = new Date

            savePost(post, () => callback(null))
        })
    })
}