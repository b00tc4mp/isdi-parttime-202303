import { authenticateUser } from '../logic/authenticate-users.js'
import { context, toggleOffClassInSection, bodyPage, clearMessageContainer, showHidePassword } from '../ui.js'
import { homePage, renderUser } from './home-page.js'

import { pushUserDataInForm } from '../logic/push-user-data-in-form.js'
import { getUserName, getUserImage } from '../logic/helpers/data-managers.js'
import { registerPage } from './register-page.js'
import { updatePosts } from '../logic/update-posts.js'
import { pushUserDataToHeader } from '../logic/push-user-to-header.js'

export const loginPage = document.querySelector('.section.login')
export const loginPageMessage = document.querySelector('.section.login').querySelector('.message')
loginPage.querySelector('form.login-form').onsubmit = function(event) {
    event.preventDefault()
    const email = loginPage.querySelector('input[name="email"').value.trim()
    const password = loginPage.querySelector('input[name="password"').value
    try {
        renderUser()
        const userId = authenticateUser(email, password)
        // const currentUser = getUserName(userId)
        // const separateUserName = getUserName(userId).split(' ')
        clearMessageContainer(loginPageMessage)
        toggleOffClassInSection(loginPage, homePage)
        bodyPage.classList.add('logged-in')
        const userName = getUserName(userId)
        const userImage = getUserImage(userId)
        context.userId = userId
        context.image = userImage

        const welcomeUser = document.querySelector('.welcome-user').innerHTML = `Welcome ${userName}!`
        renderUser()
        context.userId = userId

    } catch(error) {
        loginPage.querySelector('.message').classList.remove('success')
        loginPage.querySelector('.message').classList.add('error')
        loginPage.querySelector('.message').textContent = error.message     
        console.log(error.message)   
        console.log(error.stack)   
    }
}

document.querySelector('.login-link a').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(loginPage, registerPage)
}


loginPage.querySelector('.password > i').onclick = function() {
    showHidePassword(loginPage, '.password')
}