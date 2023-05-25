import { loginPage } from "./login-page"
import { showHideContainer } from "../ui"
import { addNewUser } from "../logic/register-user"

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
        registerPage.querySelector('form').reset()
    } catch (error) {
        alert(error.message)
    }
}

registerPage.querySelector('.register__anchor--login').onclick = function(event) {
    event.preventDefault()

    showHideContainer(registerPage, loginPage)
    registerPage.querySelector('.register__form').reset()
}