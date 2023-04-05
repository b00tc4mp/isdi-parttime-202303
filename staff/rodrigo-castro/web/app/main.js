//presentation

import {showElement, hideElement, toggleElement, resetPage} from './ui.js'
import { findUser, changeEmail, changePassword, updateUserAvatar, registerUserFull, logIn} from './logic.js'


let userLogged

const registerPage = document.querySelector('.register-page')

const homePage = document.querySelector('.home-page')
const homeBar = document.querySelector('.home-bar')
const homePageRedText = homePage.querySelector('.red-text')
const myProfileButton = homeBar.querySelector('.menu-buttons[name=my-profile]')

const profileOptions = homePage.querySelector('.profile-options')
const changeEmailMenu = homePage.querySelector('.change-email-menu')
const changePasswordMenu = homePage.querySelector('.change-password-menu')

const changeAvatarMenu = homePage.querySelector('.change-avatar-menu')
const changeAvatarButton = homePage.querySelector('.change-avatar')
const changeAvatarForm = homePage.querySelector('.change-avatar-menu').querySelector('form')
const avatarImg = homePage.querySelector('.horizontal-menu').querySelector('.user-avatar')
const defaultAvatar = 'https://avatarfiles.alphacoders.com/157/thumb-157567.jpg'

const loginPage = document.querySelector('.login-page')

registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var userName = registerPage.querySelector('.input-field[name=name]').value
    var userEmail = registerPage.querySelector('.input-field[name=email]').value
    var userPassword = registerPage.querySelector('.input-field[name=password]').value

    try {
        
        registerUserFull(userEmail, userName, userPassword)
        resetPage(registerPage)
        showElement(loginPage)

    } catch(error){
        if(error.cause === 'ownError'){
            registerPage.querySelector('.red-text').textContent = error.message
        } else {
            console.log(error)
        }
    }

})

loginPage.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    var userEmail = loginPage.querySelector('.input-field[name=email]').value.toLowerCase()
    var userPassword = loginPage.querySelector('.input-field[name=password]').value

    var foundUser = findUser(userEmail)

    try {
        logIn(foundUser, userPassword, homePage, avatarImg)
        userLogged = JSON.parse(JSON.stringify(foundUser))
        delete userLogged.password
        // userLogged = Object.assign({}, foundUser) -> otra forma de copiar objetos
        resetPage(loginPage)
    } catch(error){
        if(error.cause === 'ownError'){
            loginPage.querySelector('.red-text').textContent = error.message
        } else {
            console.log(error)
        }
    }
})

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
        changeEmail(userLogged, homePage, changeEmailMenu)
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
        changePassword(userLogged, changePasswordMenu)
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
        updateUserAvatar(userLogged, avatarUrl, avatarImg, changeAvatarForm)
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
    avatarImg.src = defaultAvatar
    userLogged = undefined
})

document.querySelector(".go-to-sign-in").addEventListener('click', (event) => {
    event.preventDefault()
    hideElement(registerPage)
    resetPage(loginPage)
    showElement(loginPage)
})

document.querySelector(".register-now-button").addEventListener("click", (event) => {
    event.preventDefault()
    hideElement(loginPage)
    resetPage(registerPage)
    showElement(registerPage)
})