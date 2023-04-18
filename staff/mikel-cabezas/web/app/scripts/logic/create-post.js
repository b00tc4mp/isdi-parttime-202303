import { getCurrentUser, getUserName } from "./helpers/data-managers.js";
import { posts, savePosts } from '../data.js'
import { updatePosts } from './update-posts.js'
import { context } from "../ui.js";

let srcNewImage

export const createPostForm = document.querySelector('.section.home').querySelector('.overlay.create-post')

const file = document.querySelector('.section.home').querySelector('form input[type="file"]')
const postImage = document.querySelector('.section.home').querySelector('form.create-post .post-image')

const printImage = file.onchange = function (event) {
    const file = event.target.files[0]
    const image = new FileReader()
    image.onload = () => {
        const base64 = image.result
        srcNewImage = base64
    }
    image.readAsDataURL(file)
    postImage.src = srcNewImage
}

export function createPost(userId, image, title, text) {

    console.log(userId)
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
    const currentPost = parseInt(posts.length + 1)

    // console.log('posts.lastIndexOf(posts[posts.length])', posts.lastIndexOf(posts[posts.length - 1]) + 1);
    // console.log('posts.length', posts.length);
    // console.log('currentPost', currentPost);

    const post = {
        id: 'post-' + currentPost,
        author: userId,
        image: srcNewImage,
        title: title, 
        text: text,
        date: new Date(),
        likes: 0
    }
    console.log(post.likes)
    posts.push(post)
    savePosts()
    updatePosts(userId)
}


// TODO steps
    // check user with userId exists
    // create post id
    // create post object and add author, image, text, and date (new Date) properties
    // add post to posts array