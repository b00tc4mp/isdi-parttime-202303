import { validateId, validateText, validateUrl } from "./helpers/validators"
import { findPostById, findUserById, savePost } from "../data"

export default function editPost(userId, postId, image, text) {
    // const post = retrievePost(userId, postId)

    validateId(userId, 'user id')
    validateId(postId, 'post id')    
    validateUrl(image, 'image url')
    validateText(text)

    const user = findUserById(userId)

    if(!user) throw new Error(`user with id ${userId} not found`)

    const post = findPostById(postId)

    if(!post) throw new Error(`post with id ${postId} not found`)

    if(userId !== post.author) throw new Error(`Post doesn't belong to this user`)

    post.image = image
    post.date = new Date
    post.text = text

    savePost(post)
}