console.log('load login-page')

import { authenticateUser, retrieveUser} from "../logic.mjs"
import { context, hide, show } from "../ui.mjs"
import { registerPage } from "./register-page.mjs"
import { homePage, homeMenu, myProfileLink } from "./home-page.mjs"


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

        if(user.avatar){
            homeMenu.querySelector('.home-header-avatar').src = user.avatar
        }


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