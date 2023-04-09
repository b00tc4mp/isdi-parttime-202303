console.log('load register-page')

import { registerUserFull } from '../logic.js'
import { resetPage, showElement, hideElement } from '../ui.js'
import { loginPage } from './login-page.js'

export const registerPage = document.querySelector('.register-page')

registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var userName = registerPage.querySelector('.input-field[name=name]').value
    var userEmail = registerPage.querySelector('.input-field[name=email]').value
    var userPassword = registerPage.querySelector('.input-field[name=password]').value

    try {
        
        registerUserFull(userEmail, userName, userPassword)
        resetPage(registerPage)
        showElement(loginPage)

    } catch(error){
        if(error.cause === 'ownError'){
            registerPage.querySelector('.red-text').textContent = error.message
        } else {
            console.log(error)
        }
    }

})

document.querySelector('.go-to-sign-in').addEventListener('click', (event) => {
    event.preventDefault()
    hideElement(registerPage)
    resetPage(loginPage)
    showElement(loginPage)
})
