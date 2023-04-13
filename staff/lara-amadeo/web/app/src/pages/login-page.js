
import { users } from "../data.js"
import { context } from "../ui.js"
import { show, hide } from "../ui.js"
import { checkCredentials } from "../logic/authenticateUser.js"
import { homePage, settingSection } from "./home-page.js"
import { showPosts } from "../logic/managePostsInFeed.js"
import { registrationPage } from "../pages/register-page.js"

export const loginPage = document.querySelector('.login')
const loginForm = loginPage.querySelector('form')
const sidebarProfileRow = homePage.querySelector('.sidebar-profile')

let authenticatedEmail


//Back to register
loginPage.querySelector('.create-account').querySelector('.link').addEventListener('click', function(event){
    event.preventDefault()

    hide(loginPage)
    show(registrationPage)
})

//Login
loginForm.onsubmit = function(event){
    event.preventDefault()

    const inputEmail = event.target.email.value
    const inputPassword = event.target.password.value

    try{
        checkCredentials(inputEmail, inputPassword)
        authenticatedEmail = inputEmail
        context.userName = users.find((user) => user.email === authenticatedEmail).username
        context.userId = users.find((user) => user.email === authenticatedEmail).id
        context.userAvatar = users.find((user => user.email === authenticatedEmail)).avatar

        hide(loginPage)
        showPosts()
        show(homePage)
        sidebarProfileRow.querySelector('.sidebar-profile-username').innerHTML = context.userName
        sidebarProfileRow.querySelector('.sidebar-profile-email').innerHTML = authenticatedEmail
        sidebarProfileRow.querySelector('.sidebar-avatar').src = context.userAvatar
        
    } catch (error) {
        loginPage.querySelector('.error-message').textContent = error.message
    } finally {
        loginPage.querySelector('input[name=password]').value= ''
        hide(settingSection)
    }
}