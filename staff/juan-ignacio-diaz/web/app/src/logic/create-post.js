import { validateId, validateUrl, validateText } from './helpers/validators.js'
import { findUserById, newPostId } from './helpers/data-managers.js'
import { posts, savePosts } from '../data.js'

export default function createPost(userId, image, text) {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    const post = {
        id: newPostId(),
        author: userId,
        image,
        text,
        date: new Date
    }

    posts.push(post)

    savePosts()
}