import { getUserName } from "./helpers/data-managers.mjs";
import { posts } from '../data.mjs'
import { updatePosts } from '../logic/update-posts.mjs'

let srcNewImage

const file = document.querySelector('.section.home').querySelector('form input[type="file"]')

const printImage = file.onchange = function (event) {
    const file = event.target.files[0]
    const image = new FileReader()
    image.onload = () => {
        const base64 = image.result
        srcNewImage = base64
    }
    image.readAsDataURL(file)
}

export function createPost(userId, image, title, text) {

    const userName = getUserName(userId)
    if (!userId) {
        throw new Error(`User with ${userId} not found`)
    }
    if (!file) {
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
    const newPost = posts.push({
        id: 'post-' + currentPost,
        author: userName,
        image: srcNewImage,
        title: title, 
        text: text,
        date: new Date()
    })
    updatePosts(userId)
}


// TODO steps
    // check user with userId exists
    // create post id
    // create post object and add author, image, text, and date (new Date) properties
    // add post to posts array