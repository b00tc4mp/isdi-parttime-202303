import {validateId, validateUrl, validateText} from './helpers/validators.mjs'
import {findUserById, newPostId} from './helpers/data-managers.mjs'
import {posts} from '../data.mjs'

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
}