import { savePost, findUserById, findPostById } from '../data'
import { validateId, validateUrl, validateText, validateCallback } from './helpers/validators'

export default function updatePost(userId, postId, image, text, callback) {
    validateId(userId)
    validateId(postId)
    validateCallback(callback)
    if(image !== '') validateUrl(image)
    if(text !== '') validateText(text)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error('Error to user'))

            return
        }

        const post = findPostById(postId)

        if (!post) {
            callback(new Error(`post with id ${postId} not found`))

            return
        }

        if (post.author !== userId) {
            callback(new Error('Error user and post do not match'))

            return
        }

        if(image !== '') post.image = image
        if(text !== '') post.text = text
        post.dateLastModified = new Date

        savePost(post)  

        callback(null)
    })
}