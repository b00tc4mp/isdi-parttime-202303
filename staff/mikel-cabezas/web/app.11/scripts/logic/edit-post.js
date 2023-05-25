import { getCurrentUser, getUserName } from "./helpers/data-managers.js";
import { posts, savePosts, savePost } from '../data.js'
import { updatePosts } from './update-posts.js'
import { context } from "../ui.js";

export const editPostForm = document.querySelector('.section.home').querySelector('.overlay.edit-post')

export function editPost(userId, postId, title, text, image) {

    const _posts =  posts() 
 
    const currentPost = postId.slice(5) - 1

    // const user = getUserName(userId)
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
    
    const img = document.querySelector('.section.user-account').querySelector('form.user-info .image-profile')
    const avatarHeader = document.querySelector('header .menu').querySelector('.avatar img.image-profile')

    const date = _posts[currentPost].date

    _posts[currentPost] = {
        id,
        author: id,
        image: image,
        title: title, 
        text: text,
        date: new Date(date),
        lastModify: new Date(),
        likes: _posts[currentPost].likes
    }
    savePost(_posts[currentPost])
    updatePosts(userId)
}


// TODO steps
    // check user with userId exists
    // create post id
    // create post object and add author, image, text, and date (new Date) properties
    // add post to posts array