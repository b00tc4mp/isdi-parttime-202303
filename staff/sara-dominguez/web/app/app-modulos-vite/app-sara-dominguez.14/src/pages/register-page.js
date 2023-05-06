console.log('load register-page')

import { registerUser } from "../logic/register-user.js"
import { show, hide } from "../ui.js"
import { loginPage } from "./login-page.js"

export const registerPage= document.querySelector('.register')
const registerForm = registerPage.querySelector('form')



// capture datas Register form
registerForm.onsubmit = function(event) {
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value

    try{
        registerUser(name,email,password)
        
        registerForm.reset()
        hide(registerPage)
        show(loginPage)

    } catch (error) {
        alert(error.message)
    }
}



//configurate anchor <a> register

registerPage.querySelector('a').conclick = function(event){
    event.preventDefault()

    registerForm.reset()
    hide(registerPage)
    show(loginPage)
}

