console.log('load register-page')

import registerUser from '../logic/register-user.mjs'
import { show, hide } from '../ui.mjs'
import { loginPage } from './login-page.mjs'

export const registerPage = document.querySelector('.register')
const registerForm = registerPage.querySelector('form')

registerForm.onsubmit = function (event) {
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value

    try {
        registerUser(name, email, password)

        hide(registerPage)
        show(loginPage)
    } catch(error) {
        alert(error.message)
    }
}

registerPage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    hide(registerPage)
    show(loginPage)
}