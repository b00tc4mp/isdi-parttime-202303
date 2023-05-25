import { posts, savePosts } from '../../data.js'
import { validateId, validateText } from '../helpers/validators.js'

export function createPost(userId, image, title, text) {
    validateId(userId)
    validateText(title)
    validateText(text)

    const _posts = posts()
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
        visibility: 'public'
    }
    _posts.push(post)
    savePosts(_posts)
}
