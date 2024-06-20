import {validateId, validateUrl, validateText, validateCallback} from './helpers/validators.js'
import {findUserById, loadPosts, savePosts} from '../data.js'

export default function createPost(userId, image, location, title, text, callback) {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(text)
    validateCallback(callback)

    findUserById(userId , user => {
        if (!user) {
            callback(new Error(`user with id ${userId} not found`))
            return
        } 

        if (!user){
            callback(new Error(`user with id ${userId} not found`))
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
                location,
                title,
                text,
                date: new Date
            }
        
            posts.push(post)
            savePosts(posts, () => callback(null))
        })
    })
}