import { posts, savePost } from '../../data.js'
import { renderPosts } from './render-posts.js'
import { context } from "../../ui.js";

export const editPostForm = document.querySelector('.section.home').querySelector('.overlay.edit-post')

export function editPost(userId, postId, title, text, image) {
    const _posts =  posts() 
 
    const currentPost = postId.slice(5) - 1
    const id = context.userId
    if (!userId) {
        throw new Error(`User with ${userId} not found`)
    }
    if (!image) {
        const currentImage = _posts.find(post => post.id === postId).image 
        srcNewImage = currentImage
    }
    if(!title) {
        throw new Error(`Title is empty`)
    }
    if(!text) {
        throw new Error(`Text is empty`)
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
    renderPosts(userId)
}