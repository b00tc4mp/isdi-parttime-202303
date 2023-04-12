import registerUser from '../logic/register-user.js'
import {show, hide} from '../ui.js'
import {loginPage} from './login-page.js'

export const registerPage = document.querySelector(".register")
const registerForm = registerPage.querySelector('form')

registerForm.onsubmit = function (event) {
    event.preventDefault()

    event.target.name.classList.remove("imput-highlight")
    event.target.email.classList.remove("imput-highlight")
    event.target.password.classList.remove("imput-highlight")

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
        registerUser(name, email, password)

        registerForm.reset()

        hide(registerPage)
        show(loginPage)
    }
    catch (error) {
        alert(error.message)

        if (error.cause === "email") { 
            event.target.email.focus()
            event.target.email.classList.add("imput-highlight")
        }

        else if (error.cause === "name") {
            event.target.name.focus()
            event.target.name.classList.add("imput-highlight")
        }
        else if (error.cause === "password") { 
            event.target.password.focus()
            event.target.password.classList.add("imput-highlight")
        }
    }    
}

registerPage.querySelector("a").onclick = function (event) {
    event.preventDefault()

    hide(registerPage)
    show(loginPage)
}