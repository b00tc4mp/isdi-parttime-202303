import { validateId, validateText, validateUrl } from "./helpers/validators.js";
import { savePost } from "../data.js";
import { findUserById, findpostbyid } from "./helpers/data-managers.js";
import showPostFeed from "./show-post-feed.js";

export function updatePost(userId, postId, image, text) {
    
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text, 'post text')

    const user = findUserById(userId)
    if (!user) throw new Error(`user not found`)

    const post = findpostbyid(postId)
    if(!post) throw new Error('post not found')

    if (post.author !== userId) throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)

    post.image = image
    post.text = text
    post.date = (new Date).toLocaleDateString('en-UK')
    
    savePost(post)
    showPostFeed()
}