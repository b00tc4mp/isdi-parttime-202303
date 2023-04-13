console.log('load home-page')

import { context, show, hide } from '../ui.js'
import updateUserAvatar from '../logic/update-user-avatar.js'
import updateUserPassword from '../logic/update-user-password.js'
import createPost from '../logic/create-post.js'
import { loginPage } from './login-page.js'
import retrievePosts from '../logic/retrieve-posts.js'
import retrieveUser from '../logic/retrieve-user.js'

const DEFAULT_AVATAR_URL = 'https://img.icons8.com/color/512/avatar.png'

export const homePage = document.querySelector('.home')
const avatarImage = homePage.querySelector('.home-header-avatar')
const profileLink = homePage.querySelector('a')

const profilePanel = homePage.querySelector('.profile')
const updateUserAvatarForm = profilePanel.querySelector('.profile-avatar-form')
const updateUserPasswordForm = profilePanel.querySelector('.profile-password-form')

const addPostPanel = homePage.querySelector('.add-post')
const addPostForm = addPostPanel.querySelector('form')
const addPostButton = homePage.querySelector('.add-post-button')

const postListPanel = homePage.querySelector('.post-list')

profileLink.onclick = function (event) {
    event.preventDefault()

    show(profilePanel)
}

homePage.querySelector('.home-header-logout').onclick = function () {
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

        alert('avatar updated')

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
        updateUserPassword(context.userId, password, newPassword, newPasswordConfirm)

        alert('password updated')

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

    try {
        createPost(context.userId, image, text)

        hide(addPostPanel)

        renderPosts()
    } catch (error) {
        alert(error.message)
    }
}

addPostForm.querySelector('.cancel').onclick = event => {
    event.preventDefault()

    addPostForm.reset()

    hide(addPostPanel)
}


export function renderPosts() {
    try {
        const posts = retrievePosts(context.userId)

        postListPanel.innerHTML = posts.reduce((accum, post) => {
            return accum + `<article>
                <img src="${post.image}">
                <p>${post.text}</p>
                <time>${post.date.toLocaleString()}</time>
            </article>`
        }, '')

        return true
    } catch (error) {
        alert(error.message)

        return false
    }
}

export function renderUser() {
    try {
        const user = retrieveUser(context.userId)

        profileLink.innerText = user.name

        avatarImage.src = user.avatar ? user.avatar : DEFAULT_AVATAR_URL

        return true
    } catch (error) {
        alert(error.message)

        return false
    }
}