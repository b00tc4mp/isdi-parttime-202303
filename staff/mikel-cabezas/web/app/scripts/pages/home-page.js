import { context, toggleOffClassInSection } from "../ui.js"
import { createPost } from "../logic/create-post.js"
import { editPost } from "../logic/edit-post.js"
import { updatePosts } from '../logic/update-posts.js'
import { getCurrentUser } from "../logic/helpers/data-managers.js"
import { renderPosts } from "../logic/render-posts.js"
import { imageToBase64 } from "../localImagesBase64.js"

export const homePage = document.querySelector('.section.home')

const image = homePage.querySelector('.overlay.create-post form > input[name="file"') 
const text = homePage.querySelector('.overlay.create-post form > input[name="text"') 
const userId = context.userId

homePage.querySelector('button.button--create-post').onclick = function(event) {
    event.preventDefault()
    const userId = context.userId
    if (userId !== null) {
        toggleOffClassInSection(homePage.querySelector('.overlay.create-post'))
        document.body.classList.add('block-scroll')
    }
}
homePage.querySelector('button.button--create-post_cancel').onclick = function(event) {
    event.preventDefault()
    document.body.classList.remove('block-scroll')
    toggleOffClassInSection(homePage.querySelector('.overlay.create-post'))
    homePage.querySelector('form').reset
}
homePage.querySelector('button.button--create-post_save').onclick = function(event) {
    event.preventDefault()
    document.body.classList.remove('block-scroll')
    const userId = context.userId
    const title = homePage.querySelector('form input.title').value
    const text = homePage.querySelector('form textarea').value
    createPost(userId, image, title, text)
    
    homePage.querySelector('form input.title').value = ""
    homePage.querySelector('form input[type="file"]').value = ""
    homePage.querySelector('form textarea').value = ""

    toggleOffClassInSection(homePage.querySelector('.overlay.create-post'))
}

homePage.querySelector('button.button--edit-post_cancel').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(homePage.querySelector('.overlay.edit-post'))
    homePage.querySelector('form.edit-post').reset
}
homePage.querySelector('button.button--edit-post_save').onclick = function(event) {
    event.preventDefault()
    const userId = context.userId
    const title = homePage.querySelector('form.edit-post input.title').value
    const text = homePage.querySelector('form.edit-post textarea').value
    const postId = homePage.querySelector('form.edit-post input[type="hidden"]').classList.value

    const image = homePage.querySelector('form.edit-post .post-image').src
    let imageTarget

    editPost(userId, postId, title, text, image)
    homePage.querySelector('form.edit-post').reset
    // homePage.querySelector('form.edit-post input[type="file"]').value = ""
    // homePage.querySelector('form.edit-post textarea').value = ""
    toggleOffClassInSection(homePage.querySelector('.overlay.edit-post'))
}

homePage.querySelector('.overlay.create-post').onclick = (event) => {
    event.target.remove()
    document.body.classList.remove('block-scroll')
}
homePage.querySelector('.overlay.edit-post').onclick = (event) => {
    event.target.remove()
    document.body.classList.remove('block-scroll')
}

document.querySelector('.home').onkeydown = (event) => {
    if(event.keyCode == 27){
       homePage.querySelector('.overlay:not(.off)').classList.add('off')
       document.body.classList.remove('block-scroll')
    }
}

export function renderUser() {
    const user = context.userId
    if(user) {
        renderPosts(user)
    }
    return user
}