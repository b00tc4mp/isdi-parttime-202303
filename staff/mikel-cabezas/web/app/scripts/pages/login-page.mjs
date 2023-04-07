import { authenticateUser } from '../logic.mjs'
import { context, toggleOffClassInSection, bodyPage, clearMessageContainer, showHidePassword } from '../ui.mjs'
import { homePage } from './home-page.mjs'
import { menuHeader } from './header.mjs'
import { userAccount } from './user-account.mjs'
import { pushUserDataInForm } from '../logic.mjs'
import { getUserName, findUserByEmail } from '../logic/helpers/data-managers.mjs'


export const loginPage = document.querySelector('.section.login')
export const loginPageMessage = document.querySelector('.section.login').querySelector('.message')

loginPage.querySelector('form.login-form').onsubmit = function(event) {
    event.preventDefault()
    const email = loginPage.querySelector('input[name="email"').value.trim()
    const password = loginPage.querySelector('input[name="password"').value
    try {
        const userId = authenticateUser(email, password)
        const currentUser = getUserName(userId)
        const separateUserName = getUserName(userId).split(' ')
        console.log(separateUserName)
        clearMessageContainer(loginPageMessage)
        toggleOffClassInSection(loginPage, homePage)
        bodyPage.classList.add('logged-in')
        const userName = getUserName(userId)

        const welcomeUser = document.querySelector('.welcome-user').innerHTML = `Welcome ${userName}!`
        menuHeader.querySelector('.user-name').innerText = currentUser

        if (separateUserName.length === 1) {
            menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
            userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[0][1]
        }
        if (separateUserName.length > 1) {
            menuHeader.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
            userAccount.querySelector('.avatar .letter').innerText = separateUserName[0][0] + separateUserName[1][0]
        }

        pushUserDataInForm(userId)
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