import { validateId, validateUrl, validateText } from './helpers/validators.js'
import { findUserById, findPostById } from './helpers/data-managers.js'
import { savePosts } from '../data.js'

export default function updatePost(userId, postId, image, text) {
    // TODO steps
    // - input validations
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)

    // - verify user exists in database
    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    // - verify post exists
    const post = findPostById(postId)

    if (!post) throw new Error(`post with id ${postId} not found`)

    // - verify post belongs to user (post.author === userId)
    if (post.author !== userId) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

    // - modify post with new data
    post.image = image
    post.text = text
    post.date = new Date

    // - save posts
    savePosts()
}