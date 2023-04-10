import { validateId, validateUrl, validateText } from "./helpers/validators.js"
import { findUserById } from "./helpers/data-managers.js"
import { posts } from "../data.js"

export function createNewPost(userId, image, text){
    validateId(userId)
    validateUrl(image)
    validateText(text)

    const foundUser = findUserById(userId)

    if (!foundUser) throw new Error(`user not found`)

    let id = 'post-1'

    const lastPost = posts[posts.length - 1]

    if (lastPost)
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