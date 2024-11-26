import {users} from './data.mjs'
import {validateName, validateEmail, validatePassword, validateNewPassword} from './validators.mjs'
import {file, img, avatarHeader, printImage} from './localImagesBase64.mjs'
import {registerUser, authenticateUser, getUserName, getCurrentUser, pushUserDataInForm, updateUserName, updateUserEmail, updateUserPassword, updateUserImage, logOut} from './logic.mjs'
import {deleteClassOnContainer, addClassOnContainer, changeMessageOnContainer, clearMessageContainer, toggleOffClassInSection, showHidePassword} from './ui.mjs'

export const registerPage = document.querySelector('.section.register')
export const loginPage = document.querySelector('.section.login')
export const homePage = document.querySelector('.section.home')
export const bodyPage = document.querySelector('body')
export const menuHeader = document.querySelector('header .menu')
export const userAccount = document.querySelector('.section.user-account')
export const registerPageMessage = document.querySelector('.section.register').querySelector('.message')
export const loginPageMessage = document.querySelector('.section.login').querySelector('.message')
export const userPageMessage = document.querySelector('.section.user-account').querySelector('.message')
export let currentUserEmail

registerPage.querySelector('form.register-form').onsubmit = function(event) {
    event.preventDefault()
    const name = registerPage.querySelector('input[name="name"').value
    const email = registerPage.querySelector('input[name="email"').value
    const password = registerPage.querySelector('input[name="password"').value
    console.log(password)
    try {
        const checkNewUserIsRegister = registerUser(name, email, password)        
    } catch(error) {
        registerPage.querySelector('.message').classList.add('error')
        registerPage.querySelector('.message').textContent = error.message
    }
    if(checkNewUserIsRegister) {
        clearMessageContainer(registerPageMessage)
        clearMessageContainer(loginPageMessage)
        addClassOnContainer(loginPageMessage, 'success')
        changeMessageOnContainer(loginPageMessage, 'User created! Please log in')
        registerPage.querySelector('form').reset()
        toggleOffClassInSection(registerPage, loginPage)
    }
}
loginPage.querySelector('form.login-form').onsubmit = function(event) {
    event.preventDefault()
    const email = loginPage.querySelector('input[name="email"').value.trim()
    const password = loginPage.querySelector('input[name="password"').value
    try {
        const currentUser = getUserName(email)
        const separateUserName = currentUser.split(' ')
        authenticateUser(email, password)
        clearMessageContainer(loginPageMessage)
        toggleOffClassInSection(loginPage, homePage)
        bodyPage.classList.add('logged-in')
        const userName = getUserName(email)
        const welcomeUser = document.querySelector('.welcome-user').innerHTML = `Welcome ${userName}!`
        menuHeader.querySelector('.user-name').innerText = currentUser
        menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
        userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
        pushUserDataInForm(email)
    } catch(error) {
        loginPage.querySelector('.message').classList.remove('success')
        loginPage.querySelector('.message').classList.add('error')
        loginPage.querySelector('.message').textContent = error.message     
        console.log(error.message)   
        console.log(error.stack)   
    }
}

document.querySelector('.logout').onclick = function(event) {
    event.preventDefault()
    deleteClassOnContainer(bodyPage, 'logged-in')
    deleteClassOnContainer(loginPage, 'off')
    addClassOnContainer(registerPage, 'off')
    addClassOnContainer(loginPage, 'off')
    addClassOnContainer(homePage, 'off')
}

document.querySelector('.login-link a').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(loginPage, registerPage)
}

document.querySelector('.register-link a').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(registerPage, loginPage)
}
menuHeader.querySelector('.submenu-element.login').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(registerPage, loginPage)
}

menuHeader.querySelector('.submenu-element.register').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(registerPage, loginPage)
}

menuHeader.querySelector('.user-account').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(homePage, userAccount)
}

userAccount.querySelector('.button--update-info__profile').onclick = function() {
    toggleOffClassInSection(userAccount.querySelector('.buttons'))
    userAccount.querySelector('form.user-info input[name="name"]').removeAttribute('disabled')
    userAccount.querySelector('form.user-info input[name="email"]').removeAttribute('disabled')
    userAccount.querySelector('form.user-info input[name="file"]').removeAttribute('disabled')
    userAccount.querySelector('.button--update-info__profile').disabled = true
    currentUserEmail = userAccount.querySelector('form.user-info input[name="email"]').value
    return currentUserEmail
}

userAccount.querySelector('.button--update-info__cancel-info').onclick = function(event) {
    event.preventDefault()
    userAccount.querySelector('form.user-info input[name="name"]').disabled = true
    userAccount.querySelector('form.user-info input[name="email"]').disabled = true
    userAccount.querySelector('form.user-info input[name="file"]').disabled = true
    userAccount.querySelector('.button--update-info__profile').removeAttribute('disabled')
    toggleOffClassInSection(userAccount.querySelector('.buttons'))
}

userAccount.querySelector('.button--update-info__save-info').onclick = function(event) {
    event.preventDefault()
    const email = userAccount.querySelector('form.user-info input[name="email"]').value
    const emailInput = userAccount.querySelector('form.user-info input[name="email"]')
    const userName = userAccount.querySelector('form.user-info input[name="name"]').value
    const userNameInput = userAccount.querySelector('form.user-info input[name="name"]')
    const imageInput = userAccount.querySelector('form.user-info input[name="file"]')
    const userID = users.map(user => user.email).indexOf(currentUserEmail)
    if (users[userID].email === currentUserEmail) {
        try {
            if(userName !== users[userID].name) {
                updateUserName(users[userID])
            }
            if(email !== currentUserEmail) {
                updateUserEmail(users[userID].email, email)
            }
            userNameInput.disabled = true
            emailInput.disabled = true
            imageInput.disabled = true
            toggleOffClassInSection(userAccount.querySelector('.buttons'))
            userAccount.querySelector('.button--update-info__profile').disabled = true
            changeMessageOnContainer(userPageMessage, 'User updated!', 'success')

        } catch (error) {
            loginPage.querySelector('.message').classList.remove('success')
            loginPage.querySelector('.message').classList.add('error')        
            userAccount.querySelector('.message').textContent = error.message     
        }
    }
    if(file.length !== 0) {
        updateUserImage(users[userID])
    }
    userAccount.querySelector('.button--update-info__profile').removeAttribute('disabled')
}
userAccount.querySelector('.button--update-info__password').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(userAccount.querySelector('form.data.user-password .buttons'))
    userAccount.querySelector('.button--update-info__password').disabled = true
    userAccount.querySelector('form.user-password input.current-password').removeAttribute('disabled')
    userAccount.querySelector('form.user-password input.new-password').removeAttribute('disabled')
    userAccount.querySelector('form.user-password input.repeat-password').removeAttribute('disabled')
}

userAccount.querySelector('.button--update-info__save-password').onclick = function(event) {
    event.preventDefault()

    try {
        var email = userAccount.querySelector('form.user-info input[name="email"]').value
        userAccount.querySelector('.button--update-info__password').removeAttribute('disabled')
        updateUserPassword(email) 
    } catch(error) {
        userAccount.querySelector('p.message').classList.add('error')
        userAccount.querySelector('p.message').textContent = error.message
    }
}


userAccount.querySelector('.button--update-info__cancel-password').onclick = function(event) {
    event.preventDefault()
    userAccount.querySelector('.user-password').classList.add('off')
    userAccount.querySelector('form.user-password input.current-password').disabled = true
    userAccount.querySelector('form.user-password input.new-password').disabled = true
    userAccount.querySelector('form.user-password input.repeat-password').disabled = true
    userAccount.querySelector('.button--update-info__password').removeAttribute('disabled')
}

document.querySelector('.password > i').onclick = function() {
    if(this.classList.contains('uil-eye')) {
        this.classList.add('uil-eye-slash')
        this.classList.remove('uil-eye')
        this.parentElement.querySelector('.password > input').removeAttribute('type', 'password')
        return
    }
    if(this.classList.contains('uil-eye-slash')) {
        document.querySelector('.password > i').classList.add('uil-eye')
        document.querySelector('.password > i').classList.remove('uil-eye-slash')
        document.querySelector('.password > i').parentElement.querySelector('.password > input').setAttribute('type', 'password')
        return
    }
}

registerPage.querySelector('.password > i').onclick = function() {
    showHidePassword(registerPage, '.password')
}

loginPage.querySelector('.password > i').onclick = function() {
    showHidePassword(loginPage, '.password')
}

userAccount.querySelector('.current-password > i').onclick = function() {
    showHidePassword(userAccount, '.current-password')
}

userAccount.querySelector('.new-password > i').onclick = function() {
    showHidePassword(userAccount, '.new-password')
}

userAccount.querySelector('.repeat-password > i').onclick = function() {
    showHidePassword(userAccount, '.repeat-password')
}

userAccount.querySelector('.delete-account p').onclick = function() {
    var userID = users.map(user => user.email).indexOf(currentUserEmail)
    users.splice(userID, 1)
    logOut()
}