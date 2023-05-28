console.log('load home-page')

import {context, show, hide} from '../ui.mjs'
import updateUserAvatar from '../logic/update-user-avatar.mjs'
import updateUserPassword from '../logic/update-user-password.mjs'
import createPost from '../logic/create-post.mjs'
import {loginPage} from './login-page.mjs'
import retrievePosts from '../logic/retrieve-posts.mjs'
import retrieveUser from '../logic/retrieve-user.mjs'

export const homePage = document.querySelector(' .home')


const DEFAULT_AVATAR_URL = 'https://cdn-icons-png.flaticon.com/512/4925/4925754.png'

const avatarImage = homePage.querySelector('.home-header-avatar')
const profileLink = homePage.querySelector('a')

const profilePanel = homePage.querySelector('.profile')
const updateUserAvatarForm = profilePanel.querySelector ('.profile-avatar-form')
const updateUserPasswordForm = profilePanel.querySelector('.profile-password-form')

const addPostPanel = homePage.querySelector('.add-post')
const addPostForm = addPostPanel.querySelector('form')
const addPostButton = homePage.querySelector('.add-post-button')

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


updateUserAvatarForm.onsubmit = function (event) {
    event.preventDefault()

    const url = event.target.url.value

    try {
        updateUserAvatar(context.userId, url)
        alert ('avatar succesfully updated')
        avatarImage.src = url
        updateUserAvatarForm.reset()

    } catch (error) {
        alert(error.message)
    }
}



updateUserPasswordForm.onsubmit = function (event) {
    event.preventDefault()

    const password = event.target.password.value
    const newPassword = event.target.newPassword.value
    const newPasswordConfirm = event.target.newPasswordConfirm.value

    try {
        updateUserPassword(context.userId, password, newPassword,newPasswordConfirm)

        alert('Password succesfully updated')
        updateUserPasswordForm.reset()

    } catch (error) {
        alert(error.message)
    } 
}

addPostButton.onclick = () => show(addPostPanel)

addPostForm.onsubmit = event => {
    event.preventDefault()

    const image = event.target.image.value
    const text = event.target.text.value

    try{
        createPost(context.userId, image, text)
        hide (addPostPanel)
        renderPosts()

    } catch(error) {
        alert(error.message)
    }

}

addPostForm.querySelector('.cancel').onclick = event => {
    event.preventDefault()
    
    addPostForm.reset()
    hide(addPostPanel)
}

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

            postItem.append(image, text, date)

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