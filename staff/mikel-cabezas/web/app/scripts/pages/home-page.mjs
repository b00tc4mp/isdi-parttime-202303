import { context, toggleOffClassInSection } from "../ui.mjs"
import { createPost } from "../logic/create-post.mjs"
import { updatePosts } from '../logic/update-posts.mjs'

export const homePage = document.querySelector('.section.home')

const image = homePage.querySelector('.overlay.create-post form > input[name="file"') 
const text = homePage.querySelector('.overlay.create-post form > input[name="text"') 


updatePosts()

homePage.querySelector('button.button--create-post').onclick = function(event) {
    event.preventDefault()
    const userId = context.userId
    console.log(userId)
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
    const userId = context.userId
    event.preventDefault()
    const title = homePage.querySelector('form input.title').value
    const text = homePage.querySelector('form textarea').value

    createPost(userId, image, title, text)
    
    homePage.querySelector('form input[type="file"]').value = ""
    homePage.querySelector('form textarea').value = ""

    toggleOffClassInSection(homePage.querySelector('.overlay.create-post'))
}

