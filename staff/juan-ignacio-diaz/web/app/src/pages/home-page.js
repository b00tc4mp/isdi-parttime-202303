import {context, show, hide, toggle} from "../ui.js"
import updateUserAvatar from '../logic/update-user-avatar.js'
import updateUserPassword from '../logic/update-user-password.js'
import {loginPage} from './login-page.js'
import retrieveUser from '../logic/retrieve-user.js'
import retrieveUserName from '../logic/retrieve-userName.js'

import createPost from '../logic/create-post.js'
import retrievePosts from '../logic/retrieve-posts.js'
import { updatePost } from "../logic/update-post.js"

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

const editPostPanel = homePage.querySelector('.edit-post')
const editPostForm = editPostPanel.querySelector('form')

const postListPanel = homePage.querySelector('.post-list')

profileLink.onclick = function (event) {
    event.preventDefault()

    toggle(profilePanel, postListPanel)
}

homePage.querySelector("button[name=logout]").onclick = function(event){
    avatarImage.src = DEFAULT_AVATAR_URL
    homePage.querySelector(".name").innerText  = ""
    hide(homePage, profilePanel)

    closeSession()
}

updateUserAvatarForm.onsubmit = function (event) {
    event.preventDefault()

    const url = event.target.url.value

    try {
        updateUserAvatar(context.userId, url)

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
        updateUserPassword(context.userId, password, newPassword, newPasswordConfirm)
        
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

editPostForm.onsubmit = function(event) {
    event.preventDefault()

    const postId = event.target.postId.value
    const image = event.target.image.value
    const text = event.target.text.value

    try {
        updatePost (context.userId, postId, image, text)

        hide(editPostPanel)

        renderPosts()
    } catch (error) {
        alert(error.message)
    }
}

editPostForm.querySelector('.cancel').onclick = function(event) {
    editPostForm.reset()

    hide(editPostPanel)
}

export function renderPosts() {
    try {
        const posts = retrievePosts(context.userId)

        postListPanel.innerHTML = ''

        posts.forEach(post => {
            const postItem = document.createElement('article')
            postItem.className = "post-article post-text"

            const postAuthor = document.createElement("h3")
            text.innerText = retrieveUserName(post.userId)

            const postMessage = document.createElement('div')
            postMessage.className = "post-menssage"

            const image = document.createElement("img")
            image.src = post.image
            image.className = "post-image"

            const text = document.createElement("p")
            text.innerText = post.text

            postMessage.append(image, text)

            const date = document.createElement("time")
            date.innerText = post.date.toLocaleString()

            if (post.author === context.userId) {
                const button = document.createElement("button")
                button.innerText = "Edit"

                button.onclick = function() {
                    editPostForm.querySelector("input[type=hidden]").value = post.id
                    editPostForm.querySelector("input[type=url]").value = post.image
                    editPostForm.querySelector("textarea").value = post.text

                    show(editPostPanel)
                }

                postItem.append(postMessage, date, button)
            } else {
                postItem.append(postMessage, date)
            }

            if ("dateLastModified" in post) {
                const dateLastModified = document.createElement("timeLastModified")
                dateLastModified.innerText = "Last Modified " + post.dateLastModified.toLocaleString()

                postItem.appendChild(dateLastModified)
            }

            postListPanel.appendChild(postItem)
        })

/*         // NOTE declarative way
        postListPanel.innerHTML = posts.reduce((accum, post) => {
            return accum + `<article class = "post-article post-text">
                <img class ="post-image" src="${post.image}">
                <p>${post.text}</p>
                <time>${post.date.toLocaleString()}</time>
            </article>`
        }, '') */

    } catch(error) {
        alert(error.message)
    }
}

export function openSession(userId) {
    try {
        context.userId = userId
        
        const user = retrieveUser(userId) 

        hide(profilePanel)
        renderPosts()

        profileLink.innerText  = user.name

        avatarImage.src = user.avatar? user.avatar : DEFAULT_AVATAR_URL

        show(homePage)

        return true
    } catch (error) {
        alert(error.message)

        return false
    }

}

function closeSession() {
    delete context.userId

    show(loginPage)
}