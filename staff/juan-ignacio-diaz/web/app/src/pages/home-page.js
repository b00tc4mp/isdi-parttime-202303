import {context, show, hide, toggle} from "../ui.js"
import updateUserAvatar from '../logic/update-user-avatar.js'
import updateUserPassword from '../logic/update-user-password.js'
import {loginPage} from './login-page.js'

import createPost from '../logic/create-post.js'
import retrievePosts from '../logic/retrieve-posts.js'

export const homePage = document.querySelector(".home")
export const avatarImage = homePage.querySelector('.home-header-avatar')
export const profileLink = homePage.querySelector('a')

export const DEFAULT_AVATAR_URL = 'https://img.icons8.com/color/512/avatar.png'

export const profilePanel = homePage.querySelector('.profile')
const updateUserAvatarForm = profilePanel.querySelector('.profile-avatar-form')
const updateUserPasswordForm = profilePanel.querySelector('.profile-password-form')

const addPostPanel = homePage.querySelector('.add-post')
const addPostFrom = addPostPanel.querySelector('form')
const addPostButton = homePage.querySelector('.add-post-button')

const postListPanel = homePage.querySelector('.post-list')

profileLink.onclick = function (event) {
    event.preventDefault()

    toggle(profilePanel)
}

homePage.querySelector("button[name=logout]").onclick = function(event){
    avatarImage.src = DEFAULT_AVATAR_URL
    homePage.querySelector(".name").innerText  = ""
    hide(homePage, profilePanel)

    closeSession()
}

function closeSession() {
    context.user = ""

    show(loginPage)
}

updateUserAvatarForm.onsubmit = function (event) {
    event.preventDefault()

    const url = event.target.url.value

    try {
        updateUserAvatar(context.user, url)

        alert('avatar updated')

        avatarImage.src = url
        
        updateUserAvatarForm.reset()
    } catch (error) {
        alert(error.message)
    }
}


updateUserPasswordForm.onsubmit = function (event) {
    event.preventDefault()

    event.target.password.classList.remove("imput-highlight")
    event.target.newPassword.classList.remove("imput-highlight")
    event.target.newPasswordConfirm.classList.remove("imput-highlight")

    const password = event.target.password.value
    const newPassword = event.target.newPassword.value
    const newPasswordConfirm = event.target.newPasswordConfirm.value

    try {
        updateUserPassword(context.user, password, newPassword, newPasswordConfirm)
        
        alert("the password is update")

        updateUserPasswordForm.reset()
    }
    catch (error) {
        alert(error.message)

        if (error.cause === "password") {
            event.target.newPassword.focus()
            event.target.password.classList.add("imput-highlight")
            event.target.newPassword.classList.add("imput-highlight")
        }
        else if (error.cause === "newPassword") { 
            event.target.newPassword.focus()
            event.target.newPassword.classList.add("imput-highlight")
        }
        else if (error.cause === "newPasswordConfirm") { 
            event.target.newPasswordConfirm.focus()
            event.target.newPasswordConfirm.classList.add("imput-highlight")
        }
    }
}

addPostButton.onclick = () => show(addPostPanel)

addPostFrom.onsubmit = function(event) {
    event.preventDefault()

    const image = event.target.image.value
    const text = event.target.text.value
    
    try {
        createPost(context.userId, image, text)

        hide(addPostPanel)

        renderPosts()
    } catch(error) {
        alert(error.message)
    }
}

addPostFrom.querySelector('.cancel').onclick = function() {
    addPostFrom.reset()

    hide(addPostPanel)
}

export function renderPosts() {
    try {
        const posts = retrievePosts(context.userId)

        // NOTE declarative way
        postListPanel.innerHTML = posts.reduce((accum, post) => {
            return accum + `<article class = "post-article post-text">
                <img class ="post-image" src="${post.image}">
                <p>${post.text}</p>
                <time>${post.date.toLocaleString()}</time>
            </article>`
        }, '')

    } catch(error) {
        alert(error.message)
    }
}