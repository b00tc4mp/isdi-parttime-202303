import { validateId, validateUrl, validateText, validateCallback } from './helpers/validators'
import { loadPosts, savePosts, findUserById, newPostId } from '../data'

export default function createPost(userId, image, text, callback) {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)
    validateCallback(callback)

    findUserById(userId, user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))
            
            return
        }

        loadPosts(posts => {
            newPostId(id => {
                posts.push({
                    id: id,
                    author: userId,
                    image,
                    text,
                    date: new Date,
                    likes: []
                })

                savePosts(posts, () => callback(null))
            })
        })
    })
}