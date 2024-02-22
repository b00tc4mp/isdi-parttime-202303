console.log('load main')

import { show, hide } from './ui.mjs'
import { registerUser, authenticateUser, retrieveUser, updateUserAvatar, updateUserPassword } from './logic.mjs'

let authenticatedUserId

const registerPage = document.querySelector('.register')
const registerForm = registerPage.querySelector('form')

const loginPage = document.querySelector('.login')
const loginForm = loginPage.querySelector('form')

const homePage = document.querySelector('.home')
const avatarImage = homePage.querySelector('.home-header-avatar')
const profileLink = homePage.querySelector('a')

const profilePanel = homePage.querySelector('.profile')
const updateUserAvatarForm = profilePanel.querySelector('.profile-avatar-form')
const updateUserPasswordForm = profilePanel.querySelector('.profile-password-form')

registerForm.onsubmit = function (event) {
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
        const result = registerUser(name, email, password)

        hide(registerPage)
        show(loginPage)
    } catch(error) {
        alert(error.message)
    }
}

registerPage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    hide(registerPage)
    show(loginPage)
}

loginForm.onsubmit = function (event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
        authenticatedUserId = authenticateUser(email, password)

        const user = retrieveUser(authenticatedUserId)

        profileLink.innerText = user.name

        if (user.avatar)
            avatarImage.src = user.avatar

        loginForm.reset()

        hide(loginPage)
        show(homePage)
    } catch (error) {
        alert(error.message)
    }
}

loginPage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    hide(loginPage)
    show(registerPage)
}

profileLink.onclick = function (event) {
    event.preventDefault()

    show(profilePanel)
}

homePage.querySelector('.home-header-logout').onclick = function () {
    authenticatedUserId = undefined

    hide(homePage, profilePanel)
    show(loginPage)
}

updateUserAvatarForm.onsubmit = function (event) {
    event.preventDefault()

    const url = event.target.url.value

    try {
        updateUserAvatar(authenticatedUserId, url)

        alert('avatar updated')

        avatarImage.src = url
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
        updateUserPassword(authenticatedUserId, password, newPassword, newPasswordConfirm)

        alert('password updated')
    } catch (error) {
        alert(error.message)
    }
}