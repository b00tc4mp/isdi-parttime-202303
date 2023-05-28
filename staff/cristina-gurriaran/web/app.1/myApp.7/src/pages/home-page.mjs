console.log('load home-page')

import {context, show, hide} from '../ui.mjs'
import {loginPage} from './login-page.mjs'
import retrievePosts from '../logic/retrieve-posts.mjs'
import retrieveUser from '../logic/retrieve-user.mjs'

import initProfilePanel from '../components/profile-panel.js'
import initAddPostPanel from '../components/add-post-panel.js'
import initEditPostPanel from '../components/edit-post-panel.js'

export const homePage = document.querySelector(' .home')

const DEFAULT_AVATAR_URL = 'https://cdn-icons-png.flaticon.com/512/4925/4925754.png'
const avatarImage = homePage.querySelector('.home-header-avatar')
const profileLink = homePage.querySelector('a')
const addPostButton = homePage.querySelector('.add-post-button')

const profilePanel = initProfilePanel(homePage, avatarImage)
const addPostPanel = initAddPostPanel(homePage, renderPosts)
const editPostPanel = initEditPostPanel(homePage, renderPosts)

const editPostForm = editPostPanel.querySelector('form')
const postListPannel = homePage.querySelector('.post-list')


profileLink.onclick = function(event) {
    event.preventDefault()

    show(profilePanel)
}

homePage.querySelector('.home-header-logout').onclick = function(){
    delete context.userId
    avatarImage.src = DEFAULT_AVATAR_URL

    hide(homePage, profilePanel)
    show(loginPage)
}

addPostButton.onclick = () => show(addPostPanel)


export function renderPosts(){
    postListPannel.innerHTML = ''

    try {
        const posts = retrievePosts(context.userId)

        posts.forEach(post => {
            const postItem = document.createElement('article')
            const image = document.createElement('img')
            image.src = post.image

            const text = document.createElement('p')
            text.innerText = post.text

            const date = document.createElement('time')
            date.innerText = post.date.toLocaleString()

            if (post.author === context.userId) {

                const button = document.createElement('button')
                button.innerText = 'Edit'

                button.onclick = () => {
                    editPostForm.querySelector('input[type=hidden').value = post.id
                    editPostForm.querySelector('input[type=url').value = post.image
                    editPostForm.querySelector('textarea').value = post.text

                    show(editPostPanel)
                }

                postItem.append(image, text, date, button)
                
            } else {
                postItem.append(image, text, date)
            }
            postListPannel.appendChild(postItem)
            
        })
        
        return true

    } catch(error){
        alert(error.message)

        return false
    }
}


export function renderUser() {
    try {

        const user = retrieveUser(context.userId)

        profileLink.innerText = user.name

        avatarImage.src = user.avatar? user.avatar : DEFAULT_AVATAR_URL

        return true

    } catch (error) {

        alert(error.message)

        return false
     
    }
}