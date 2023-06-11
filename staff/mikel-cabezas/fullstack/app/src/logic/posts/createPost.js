import { loadPosts, savePosts } from '../../data.js'
import { validators } from 'com'

const { validateUserId, validateText } = validators

export function createPost(userId, image, title, text, location, callback) {
    validateUserId(userId)
    validateText(title)
    validateText(text)

    loadPosts(_posts => {
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
            location: ''
        }
        if (location) {
            post.location = location
        }
        _posts.push(post)
        savePosts(_posts, () => callback(null))
    })
}
