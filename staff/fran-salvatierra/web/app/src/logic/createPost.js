import { validateId, validateUrl, validateText } from './helpers/validators'
import { findUserById } from './helpers/data-managers'
import { posts, savePosts } from '../data'


/**
 * Create a post with the userId, image and text provided.
 * 
 * @param {string} userId The post's user identifier
 * @param {string} image The post's image
 * @param {string} text The post's text
 * 
 * @returns {string} The created post
 */

export default function createPost(userId, image, text) {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)
    /*TODO give valor to a post */
    // validateValor(valor)

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} not found`)

    let id = 'post-1'

    const _posts = posts()

    const lastPost = _posts[_posts.length - 1]

    if (lastPost)
        id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

    const post = {
        id,
        author: userId,
        image,
        text,
        date: new Date, 
        // valor,
    }

    _posts.push(post)

    savePosts(_posts)
}