import { validateId, validateUrl, validateText } from './helpers/validators.js'
import { findUserById } from './helpers/data-managers.js'
import { posts } from '../data.js'

export default function createPost(userId, image, text) {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    const user = findUserById(userId)

    if(!user) throw new Error(`User with id ${userId} not found`) // maybe un something went wrong al usuario y este mensaje por consola

    const lastPost = posts[posts.length - 1]

    let id = 'post-1'

    if(lastPost)
        id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

    const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date
    }

    posts.push(post)
}