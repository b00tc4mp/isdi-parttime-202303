console.log('load login-page')

import authenticateUser from '../logic/authenticate-user.mjs'
import { context, show, hide } from '../ui.mjs'
import { registerPage } from './register-page.mjs'
import { homePage, renderUser, renderPosts } from './home-page.mjs'


export const loginPage = document.querySelector('.login')
const loginForm = loginPage.querySelector('.form')

loginForm.onsubmit = function (event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value
    
    try{

        context.userId = authenticateUser(email, password)
        
        renderUser()
        renderPosts()

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

