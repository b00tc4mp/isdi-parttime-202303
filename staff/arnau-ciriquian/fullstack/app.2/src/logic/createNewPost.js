import { validateId, validateUrl, validateText, validateCallback } from "../../../com/validators"
import { savePosts, findUserById, loadPosts } from "../data"

export function createNewPost(userId, image, text, callback) {
    validateId(userId)
    validateUrl(image)
    validateText(text)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user not found`))

            return
        }

        let id = 'post-1'

        loadPosts(posts => {
            const lastPost = posts[posts.length - 1]

            if (lastPost)
                id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)

            const post = {
                id,
                author: userId,
                image,
                text,
                date: (new Date).toLocaleDateString('en-UK'),
                likes: [],
                hidden: false
            }

            posts.push(post)

            savePosts(posts, () => callback(null))
        })
    })
}