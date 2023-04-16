import { context, show, hide, toggle } from "../ui.js"
import updateUserAvatar from '../logic/update-user-avatar.js'
import updateUserPassword from '../logic/update-user-password.js'
import { loginPage } from './login-page.js'
import { msAlert } from './alert-page.js'
import retrieveUser from '../logic/retrieve-user.js'

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

        msAlert('avatar updated')

        avatarImage.src = url
        
        updateUserAvatarForm.reset()
    } catch (error) {
        msAlert(error.message)
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
        
        msAlert("the password is update")

        updateUserPasswordForm.reset()
    }
    catch (error) {
        msAlert(error.message)

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
        addPostFrom.reset

        renderPosts()
    } catch(error) {
        msAlert(error.message)
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
        msAlert(error.message)
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


            const postAuthor = document.createElement('div')
            postAuthor.className = "post-Author"

            const user = retrieveUser(post.author)

            const postAuthorName = document.createElement("h1")
            postAuthorName.className = "name"
            postAuthorName.innerText = retrieveUser(post.author).name
            
            if (user.avatar) {
                const postAuthorAvatar = document.createElement("img")
                postAuthorAvatar.className = "home-header-avatar"
                postAuthorAvatar.src = user.avatar

                postAuthor.append(postAuthorAvatar, postAuthorName)
            }
            else 
                postAuthor.append(postAuthorName)

            const postMessage = document.createElement('div')
            postMessage.className = "post-menssage"

                const image = document.createElement("img")
                image.src = post.image
                image.className = "post-image"

                const text = document.createElement("p")
                text.innerText = post.text

            postMessage.append(image, text)

            postItem.append(postAuthor, postMessage)

            const postInfo = document.createElement('div')
            postInfo.className = "post-info"

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

                    postInfo.append(date, button)
                } 
                else {
                    postInfo.append(date)
                }

                if ("dateLastModified" in post) {
                    const dateLastModified = document.createElement("time")
                    dateLastModified.innerText = "Last Modified " + post.dateLastModified.toLocaleString()

                    postInfo.appendChild(dateLastModified)
                }


                /*
                const divLikes = document.createElement("div")

                let likesPost = 0
                if("likes" in post) likesPost = post.likes

                const buttonLikesPlus = document.createElement("button")
                button.innerText = "+"

                button.onclick = function() {
                    editPostForm.querySelector("input[type=hidden]").value = post.id
                    editPostForm.querySelector("input[type=url]").value = post.image
                    editPostForm.querySelector("textarea").value = post.text

                    show(editPostPanel)
                }
                */                 


            postItem.appendChild(postInfo)

            postListPanel.appendChild(postItem)
        })

/* 
        // NOTE declarative way
        postListPanel.innerHTML = posts.reduce((accum, post) => {
            return accum + `<article class = "post-article post-text">
                <img class ="post-image" src="${post.image}">
                <p>${post.text}</p>
                <time>${post.date.toLocaleString()}</time>
            </article>`
        }, '') 
*/

    } catch(error) {
        msAlert(error.message)
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
        msAlert(error.message)

        return false
    }

}

function closeSession() {
    delete context.userId

    show(loginPage)
}