import { context, toggleOffClassInSection } from "../ui.js"
import { createPost } from "../logic/create-post.js"
import { updatePosts } from '../logic/update-posts.js'
import { getCurrentUser } from "../logic/helpers/data-managers.js"

export const homePage = document.querySelector('.section.home')

const image = homePage.querySelector('.overlay.create-post form > input[name="file"') 
const text = homePage.querySelector('.overlay.create-post form > input[name="text"') 
const userId = context.userId

try {
    const userId = getCurrentUser()
    if(userId) {
        updatePosts(userId)
    }
} catch(error) {
    console.log(error.message)
}

homePage.querySelector('button.button--create-post').onclick = function(event) {
    event.preventDefault()
    const userId = context.userId
    if (userId !== null) {
        toggleOffClassInSection(homePage.querySelector('.overlay.create-post'))
    }
}
homePage.querySelector('button.button--create-post_cancel').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(homePage.querySelector('.overlay.create-post'))
    homePage.querySelector('form').reset
}
homePage.querySelector('button.button--create-post_save').onclick = function(event) {
    event.preventDefault()
    const userId = context.userId
    const title = homePage.querySelector('form input.title').value
    const text = homePage.querySelector('form textarea').value
    createPost(userId, image, title, text)
    
    homePage.querySelector('form input.title').value = ""
    homePage.querySelector('form input[type="file"]').value = ""
    homePage.querySelector('form textarea').value = ""

    toggleOffClassInSection(homePage.querySelector('.overlay.create-post'))
}

