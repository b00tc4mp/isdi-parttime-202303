import { savePosts } from "../data.js"
import { findUserById, findPostById } from "./helpers/data-managers.js"
import { validateId, validateUrl, validateText } from "./helpers/validators.js"

export function updatePost(userId, postId, image, text) {
    validateId(userId)
    validateId(postId)
    validateUrl(image)
    validateText(text)

    if (!findUserById(userId))  throw new Error("Error to user")

    const post = findPostById(postId)
    if (!post)  throw new Error("Error to post")

    if (post.author !== userId) throw new Error("Error user and post do not coincden")

    post.image = image
    post.text = text
    post.dateLastModified = new Date

    savePosts()  
}