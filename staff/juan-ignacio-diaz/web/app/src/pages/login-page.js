import authenticateUser from '../logic/authenticate-user.js'
import { show, hide } from '../ui.js'
import { registerPage } from './register-page.js'
import { openSession } from './home-page.js'

export const loginPage = document.querySelector(".login")
const loginForm = loginPage.querySelector('form')

loginForm.onsubmit = function (event) {
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    try {
        const userId = authenticateUser(email, password)

        loginForm.reset()
        hide(loginPage)

        openSession(userId)
    }
    catch(error) {
        alert(error.message)
    }
}

loginPage.querySelector("a").onclick = function (event) {
    event.preventDefault()

    hide(loginPage)
    show(registerPage)
}