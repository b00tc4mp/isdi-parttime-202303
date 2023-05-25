import { showHidePassword, toggleOffClassInSection, clearMessageContainer, addClassOnContainer, changeMessageOnContainer } from "../ui.js"
// import { loginPage, loginPageMessage } from "./login-page.js"
import { registerUser } from "../logic/users/register-user.js"

export const registerPage = document.querySelector('.section.register')
export const registerPageMessage = document.querySelector('.section.register').querySelector('.message')

registerPage.querySelector('.password > i').onclick = function() {
    showHidePassword(registerPage, '.password')
}

registerPage.querySelector('form.register-form').onsubmit = function(event) {
    event.preventDefault()
    const name = registerPage.querySelector('input[name="name"').value
    const email = registerPage.querySelector('input[name="email"').value
    const password = registerPage.querySelector('input[name="password"').value
    try {
        const checkNewUserIsRegister = registerUser(name, email, password)        
        if(checkNewUserIsRegister) {
            clearMessageContainer(registerPageMessage)
            clearMessageContainer(loginPageMessage)
            addClassOnContainer(loginPageMessage, 'success')
            changeMessageOnContainer(loginPageMessage, 'User created! Please log in')
            registerPage.querySelector('form').reset()
            toggleOffClassInSection(registerPage, loginPage)
        }
    } catch(error) {
        registerPage.querySelector('.message').classList.add('error')
        registerPage.querySelector('.message').textContent = error.message
    }
}

document.querySelector('.register-link a').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(registerPage, loginPage)
}
