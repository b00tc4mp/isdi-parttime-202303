import { getCurrentUser, getUserName } from "./helpers/data-managers.js";
import { posts, savePosts } from '../data.js'
import { updatePosts } from './update-posts.js'
import { context } from "../ui.js";

let srcNewImage
const file = document.querySelector('.section.home').querySelector('form.edit-post input[type="file"]')

const printImage = file.onchange = function (event) {
    const file = event.target.files[0]
    const image = new FileReader()
    image.onload = () => {
        const base64 = image.result
        srcNewImage = base64
    }
    image.readAsDataURL(file)
}

export function editPost(userId, postId, title, text) {

    // const user = getUserName(userId)
    const id = context.userId
    if (!userId) {
        throw new Error(`User with ${userId} not found`)
    }
    if (!file.value) {
        throw new Error(`Image is empty`)
    }
    if(!title) {
        throw new Error(`Title is empty`)
    }
    if(!text) {
        throw new Error(`Text is empty`)
    }
    
    const img = document.querySelector('.section.user-account').querySelector('form.user-info .image-profile')
    const avatarHeader = document.querySelector('header .menu').querySelector('.avatar img.image-profile')

    const currentPost = postId.slice(5)
    posts[currentPost] = {
        id: 'post-' + currentPost,
        author: id,
        image: srcNewImage,
        title: title, 
        text: text,
        date: new Date()
    }
    savePosts()
    updatePosts(userId)
}


// TODO steps
    // check user with userId exists
    // create post id
    // create post object and add author, image, text, and date (new Date) properties
    // add post to posts array