import {loadPosts, savePosts } from '../../data.js'
import { validateId, validateText } from '../helpers/validators.js'

export function createPost(userId, image, title, text, location, callback) {
    validateId(userId)
    validateText(title)
    validateText(text)

    loadPosts(_posts =>  {
        const currentPost = parseInt(_posts.length + 1)
        const post = {
            id: 'post-' + currentPost,
            author: userId,
            image: image,
            title: title, 
            text: text,
            date: new Date(),
            comments: [],
            likes: [],
            visibility: 'public',
        }
        if(location) {
            post.location = location
        }
        _posts.push(post)
        savePosts(_posts, () => callback(null))
    })
}
