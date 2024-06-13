import { validateCallback, validateId, validateText, validateUrl } from "../../../com/validators"
import { savePost, findUserById, findPostById } from "../data"

export function updatePost(userId, postId, image, text, callback) {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    validateUrl(image, 'image url')
    validateText(text, 'post text')
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user not found`))

            return
        } 

        findPostById(postId, post => {
            if(!post) {
                callback(new Error('post not found'))

                return
            } 

            if (post.author !== userId) {
                callback(new Error(`post with id ${postId} does not belong to user with id ${userId}`))

                return
            } 

            post.image = image
            post.text = text
            post.date = (new Date).toLocaleDateString('en-UK')
            
            savePost(post, () => callback(null))
        })
    })
}