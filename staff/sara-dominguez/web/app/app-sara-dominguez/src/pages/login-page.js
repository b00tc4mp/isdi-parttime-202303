console.log('load login-page')

import { authenticateUser } from '../logic/authenticate-user.js'
import { context, hide, show } from "../ui.js"
import { registerPage } from "./register-page.js"
import { homePage, renderPosts, renderUser } from "./home-page.js"




export const loginPage= document.querySelector('.login')
const loginForm= loginPage.querySelector('form')



//capture datas Login form
loginForm.onsubmit = function (event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value
    
    try{
        context.userId = authenticateUser(email,password)
        
        renderUser()
        
        loginForm.reset()

        hide (loginPage)
        
        renderPosts()
        
        //TODO ORDER PAINT POSTS
        show(homePage)

        
        }   catch (error) {
            alert(error.message)
        }
    
}


//configurate anchor <a> Login

loginPage.querySelector('a').onclick = function(event){
    event.preventDefault()

    loginForm.reset()
    hide(loginPage)
    show(registerPage)
}