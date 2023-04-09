console.log('load home page')

import {showElement, hideElement, toggleElement, resetPage, context} from '../ui.js'
import { changeEmail, changePassword, updateUserAvatar } from '../logic.js'
import { loginPage } from './login-page.js'

export const homePage = document.querySelector('.home-page')
const homeBar = document.querySelector('.home-bar')
const myProfileButton = homeBar.querySelector('.menu-buttons[name=my-profile]')

const profileOptions = homePage.querySelector('.profile-options')
const changeEmailMenu = homePage.querySelector('.change-email-menu')
const changePasswordMenu = homePage.querySelector('.change-password-menu')

const changeAvatarMenu = homePage.querySelector('.change-avatar-menu')
const changeAvatarButton = homePage.querySelector('.change-avatar')
const changeAvatarForm = homePage.querySelector('.change-avatar-menu').querySelector('form')
export const avatarImg = homePage.querySelector('.horizontal-menu').querySelector('.user-avatar')
const DEFAULT_AVATAR_URL = 'https://avatarfiles.alphacoders.com/157/thumb-157567.jpg'

myProfileButton.addEventListener('click', () => {
    toggleElement(profileOptions)
    resetPage(changeAvatarMenu, changePasswordMenu, changeEmailMenu)
})

homePage.querySelector('.change-email').onclick = () => {
    hideElement(profileOptions)
    showElement(changeEmailMenu)
}

changeEmailMenu.querySelector('form').onsubmit = (event) => {
    event.preventDefault()
    try {
        changeEmail(context.userId, homePage, changeEmailMenu)
    } catch(error){
        if(error.cause === 'ownError'){
            changeEmailMenu.querySelector('.red-text').textContent = error.message
        } else {
            console.log(error)
        }
    }
}

homePage.querySelector('.change-password').addEventListener('click', () => { 
    resetPage(changePasswordMenu)
    hideElement(profileOptions)
    showElement(changePasswordMenu)
})

changePasswordMenu.querySelector('form').onsubmit = function(event) { 
    event.preventDefault();
    try {
        changePassword(context.userId, changePasswordMenu)
    } catch(error){
        if(error.cause === 'ownError'){
            changePasswordMenu.querySelector('.red-text').textContent = error.message
        } else {
            console.log(error)
        }
    }
}

changeAvatarButton.onclick = function() {
    showElement(changeAvatarMenu)
    hideElement(profileOptions)
}

changeAvatarForm.onsubmit = function(event) {
    event.preventDefault()
    var avatarUrl = event.target.avatarurl.value

    try {
        updateUserAvatar(context.userId, avatarUrl, avatarImg, changeAvatarForm)
    } catch(error){
        if(error.cause === 'ownError'){
            alert(error.message)
            // changePasswordMenu.querySelector('.red-text').textContent = error.message -> TODO: ACOMODAR!!!!
        } else {
            console.log(error)
        }
    }
}

homeBar.querySelector('[name=logout]').addEventListener('click', () => {
    hideElement(homePage, changeAvatarMenu, changePasswordMenu, profileOptions)
    showElement(loginPage)
    avatarImg.src = DEFAULT_AVATAR_URL
    context.userId = undefined
})