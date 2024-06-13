import { validateId, validateUrl, validateText } from "./helpers/validators"
import { findUserById } from "./helpers/data-managers"
import { posts, savePosts } from "../data"
import showPostFeed from "./show-post-feed"
import { homePageMain } from "../pages/home-page"

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
        date: (new Date).toLocaleDateString('en-UK')
    }

    posts.push(post)

    savePosts()
    showPostFeed()
}