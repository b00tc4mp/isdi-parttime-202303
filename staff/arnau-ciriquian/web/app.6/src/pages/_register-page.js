import { loginPage } from "./login-page"
import { showHideContainer } from "../ui"
import { addNewUser } from "../logic/register-user"
import { hideAllPasswords, unslashAllEyes } from "../logic/password-eyes"

export const registerPage = document.querySelector('.register')


registerPage.querySelector('form').onsubmit = function(event) {
    event.preventDefault()
    const newUser = event.target.name.value
    const newEmail = event.target.email.value
    const newPassword = event.target.password.value
    const confirmedPassword = event.target.passwordConfirmation.value

    try {
        addNewUser(newUser, newEmail, newPassword, confirmedPassword)

        registerPage.classList.add('off')
        loginPage.classList.remove('off')

        hideAllPasswords(registerPage, '.register__password', '.register__password--confirm')
        unslashAllEyes(registerPage, '.register-eye', '.register-confirm-eye')

        registerPage.querySelector('form').reset()
    } catch (error) {
        alert(error.message)
    }
}

registerPage.querySelector('.register__anchor--login').onclick = function(event) {
    event.preventDefault()

    showHideContainer(registerPage, loginPage)
    hideAllPasswords(registerPage, '.register__password', '.register__password--confirm')
    unslashAllEyes(registerPage, '.register-eye', '.register-confirm-eye')

    registerPage.querySelector('.register__form').reset()
}