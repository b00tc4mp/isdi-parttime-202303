import { validateId, validateUrl, validateText } from './helpers/validators.mjs'
import { findUserById } from './helpers/data-managers.mjs'
import { posts } from '../data.mjs'

export default function createPost(userId, image, text) {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)

    // TODO steps
    // check user with userId exists
    // create post id
    // create post object and add auther, image, text, and date (new Date) properties
    // add post to posts array

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    let id = 'post-1'

    const lastPost = posts[posts.length - 1]

    if (lastPost)
        id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

    const post = {
        id,
        author: userId,
        image,
        text,
        data: new Date
    }

    posts.push(post)
}