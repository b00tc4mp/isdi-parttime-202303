console.log('load home-page')

import { context, show, hide } from '../ui.mjs'
import updateUserAvatar from '../logic/update-user-avatar.mjs'
import updateUserPassword from '../logic/update-user-password.mjs'
import createPost from '../logic/create-post.mjs'
import { loginPage } from './login-page.mjs'

export const DEFAULT_AVATAR_URL = 'https://img.icons8.com/color/512/avatar.png'

export const homePage = document.querySelector('.home')
export const avatarImage = homePage.querySelector('.home-header-avatar')
export const profileLink = homePage.querySelector('a')

const profilePanel = homePage.querySelector('.profile')
const updateUserAvatarForm = profilePanel.querySelector('.profile-avatar-form')
const updateUserPasswordForm = profilePanel.querySelector('.profile-password-form')

const addPostPanel = homePage.querySelector('.add-post')
const addPostButton = homePage.querySelector('.add-post-button')

profileLink.onclick = function (event) {
    event.preventDefault()

    show(profilePanel)
}

homePage.querySelector('.home-header-logout').onclick = function () {
    context.userId = null
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
    const newPassword =  event.target.newPassword.value
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

addPostPanel.querySelector('form').onsubmit = event => {
    event.preventDefault()

    const image = event.target.image.value
    const text = event.target.text.value
    
    try {
        createPost(context.userId, image, text)

        alert('post created')

        hide(addPostPanel)
    } catch(error) {
        alert(error.message)
    }
}