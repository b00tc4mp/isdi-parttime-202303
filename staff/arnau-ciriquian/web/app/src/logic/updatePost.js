import { validateId, validateText, validateUrl } from "./helpers/validators.js";
import { posts, savePosts } from "../data.js";
import { findUserById } from "./helpers/data-managers.js";
import showPostFeed from "./show-post-feed.js";

export function updatePost(userId, postId, image, text) {
    
    try {
        validateId(userId)
        validateId(postId)
        validateUrl(image)
        validateText(text)

        const foundUser = findUserById(userId)
        if (!foundUser) throw new Error(`user not found`)

        if(!posts.find(post => post.id === postId)) throw new Error('post not found')

        // - verify post belongs to user (post.author === userId)

        posts.forEach(post => {
            if (post.id === postId) {
                post.image = image
                post.text = text
            }
        })

        savePosts()
        showPostFeed()

    } catch (error) {
        alert(error.message)
    }
}