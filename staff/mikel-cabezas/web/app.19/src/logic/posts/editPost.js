import { posts, savePost } from '../../data.js'
// import { renderPosts } from './render-posts.js'
import { context } from "../../ui.js";
import { validateId, validateText } from '../helpers/validators.js';

export function editPost(userId, postId, title, text, image) {
    const _posts =  posts() 
 
    const currentPost = postId.slice(5) - 1
    const id = context.userId

    validateId(userId)
    validateText(title)
    validateText(text)

    if (!image) {
        const currentImage = _posts.find(post => post.id === postId).image 
        srcNewImage = currentImage
    } 

    const date = _posts[currentPost].date
    _posts[currentPost] = {
        id: postId,
        author: userId,
        image: image,
        title: title, 
        text: text,
        date: new Date(date),
        lastModify: new Date(),
        likes: _posts[currentPost].likes,
        comments: _posts[currentPost].comments
    }
    savePost(_posts[currentPost])
}