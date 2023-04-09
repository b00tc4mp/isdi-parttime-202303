Console.log('load login-module')

import authenticateUser from '../helpers/auth-user.js'
//import retrieveUser from '../logic/retrieve-user.mjs'
//import { context, show, hide } from '../ui.mjs'
//import { registerPage } from './register-page.mjs'
//import { homePage, profileLink, avatarImage, DEFAULT_AVATAR_URL } from './home-page.mjs'

export const loginPage = document.querySelector('.user_login')
const loginForm = loginPage.querySelector('form')

loginForm.onsubmit = function (event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
        context.userId = authenticateUser(email, password)

        //const user = retrieveUser(context.userId)

        //profileLink.innerText = user.name

        //avatarImage.src = user.avatar? user.avatar : DEFAULT_AVATAR_URL

        //loginForm.reset()

        //hide(loginPage)
        //show(homePage)
    } catch (error) {
        alert(error.message)
    }
}

//loginPage.querySelector('a').onclick = function (event) {
 //   event.preventDefault()

 //   hide(loginPage)
   // show(registerPage)
//}