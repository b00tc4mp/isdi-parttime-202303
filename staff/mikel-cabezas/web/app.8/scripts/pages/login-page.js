import { authenticateUser } from '../logic/authenticate-users.js'
import { context, toggleOffClassInSection, bodyPage, clearMessageContainer, showHidePassword } from '../ui.js'
import { homePage, renderUser } from './home-page.js'

import { pushUserDataInForm } from '../logic/push-user-data-in-form.js'
import { getUserName } from '../logic/helpers/data-managers.js'
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
        context.userId = userId
        const userName = getUserName(userId)

        const welcomeUser = document.querySelector('.welcome-user').innerHTML = `Welcome ${userName}!`
        // menuHeader.querySelector('.user-name').innerText = currentUser

        // if (separateUserName.length === 1) {
        //     menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
        //     userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
        // }
        // if (separateUserName.length > 1) {
        //     menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
        //     userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
        // }
        pushUserDataToHeader(userId)

        pushUserDataInForm(userId)
        context.userId = userId
        updatePosts(userId)

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