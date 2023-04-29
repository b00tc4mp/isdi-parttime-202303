import { posts, savePosts } from '../../data.js'
import { renderPosts } from './render-posts.js'

let srcNewImage

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
    validateId(userId)
    validateImage(image)
    validateText(title)
    validateText(text)
    const _posts = posts()
    
    const currentPost = parseInt(_posts.length + 1)
    const post = {
        id: 'post-' + currentPost,
        author: userId,
        image: srcNewImage,
        title: title, 
        text: text,
        date: new Date(),
        comments: [],
        likes: []
    }
    _posts.push(post)
    savePosts(_posts)
    renderPosts(userId)
}
