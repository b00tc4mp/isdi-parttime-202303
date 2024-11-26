import { savePost } from '../data'
import { findUserById, findPostById } from './helpers/dataManagers'
import { validateId, validateUrl, validateText } from './helpers/validators'

export default function updatePost(userId, postId, image, text) {
    validateId(userId)
    validateId(postId)
    if(image !== '') validateUrl(image)
    if(text !== '') validateText(text)

    if (!findUserById(userId)) throw new Error("Error to user")

    const post = findPostById(postId)

    if (!post) throw new Error(`post with id ${postId} not found`)

    if (post.author !== userId) throw new Error("Error user and post do not coincden")

    if(image !== '') post.image = image
    if(text !== '') post.text = text
    post.dateLastModified = new Date

    savePost(post)  
}