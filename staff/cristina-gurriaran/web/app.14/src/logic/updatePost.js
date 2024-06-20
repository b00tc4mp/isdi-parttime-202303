import {validateId, validateUrl, validateText} from './helpers/validators.js'
import {findUserById, findPostById} from '../data.js'
import {savePost} from '../data.js'


export default function updatePost(userId, postId, image, location, title, text) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text)

    const user = findUserById(userId)
    if (!user) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)
    if (!post) throw new Error(`user with id ${postId} not found`)

    if (post.author !== userId) throw new Error (`post with id ${postId} does not belong to user with id ${userId}`)

    post.image = image
    post.location = location
    post.title = title
    post.text = text
    post.date = new Date

    savePost(post)
}


