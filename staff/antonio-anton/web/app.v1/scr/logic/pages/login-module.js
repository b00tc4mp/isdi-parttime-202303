console.log('load login-module')

import authenticateUser from '../helpers/auth-user.js'
//import retrieveUser from '../logic/retrieve-user.mjs'
import { context, remove_Menu_element } from '../../assets/js/utility.js'
//import { registerPage } from './register-page.mjs'
//import { homePage, profileLink, avatarImage, DEFAULT_AVATAR_URL } from './home-page.mjs'

export const loginPage = document.querySelector('.user_login')
const loginForm = loginPage.querySelector('form')

const registerPage = document.querySelector('[for="lblerror"]')
registerPage.classList.add('off');

loginForm.onsubmit = function (event) {
    event.preventDefault()
   
    const email = event.target.email.value
    const password = event.target.password.value


    try {
        context.userId = authenticateUser(email, password)
        $(".primary-Banner").hide();
       
        
       
        //const user = retrieveUser(context.userId)

        //profileLink.innerText = user.name

        //avatarImage.src = user.avatar? user.avatar : DEFAULT_AVATAR_URL

        //loginForm.reset()
        
        
        //show(homePage)
    } catch (error) {
        
        registerPage.classList.remove('off');
       
        console.log(error.message)
        alert(error.message)
    }
}

//loginPage.querySelector('a').onclick = function (event) {
 //   event.preventDefault()

 //   hide(loginPage)
   // show(registerPage)
//}