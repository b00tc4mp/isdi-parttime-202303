console.log('load login-page')

import { authenticateUser } from '../logic/authenticate-user.mjs'
import { retrieveUser } from "../logic/retrieve-user.mjs"
import { context, hide, show } from "../ui.mjs"
import { registerPage } from "./register-page.mjs"
import { homePage, myProfileLink, avatarImage, DEFAULT_AVATAR_URL } from "./home-page.mjs"




export const loginPage= document.querySelector('.login')
const loginForm= loginPage.querySelector('form')



//capture datas Login form
loginForm.onsubmit = function (event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value
    
    try{
        context.userId = authenticateUser(email,password)
        
        const user = retrieveUser(context.userId)

        myProfileLink.innerText = `${user.name}`

        
        avatarImage.src = user.avatar? user.avatar: DEFAULT_AVATAR_URL
        


        loginForm.reset()

        hide (loginPage)
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