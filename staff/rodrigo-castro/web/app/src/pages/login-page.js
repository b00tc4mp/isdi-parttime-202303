console.log('load login page')

import { authenticateUser, retrieveUser } from '../logic.js';
import { context, resetPage, hideElement, showElement } from '../ui.js'
import { registerPage } from './register-page.js'
import { homePage, avatarImg } from './home-page.js'


export const loginPage = document.querySelector('.login-page')

loginPage.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const userEmail = loginPage.querySelector('.input-field[name=email]').value.toLowerCase()
    const userPassword = loginPage.querySelector('.input-field[name=password]').value

    
    try {
        
        context.userId = authenticateUser(userEmail, userPassword, homePage, avatarImg)
        console.log(context.userId)

        const user = retrieveUser(context.userId)
        console.log(user)

        // userLogged = JSON.parse(JSON.stringify(foundUser))
        
        // delete userLogged.password
        
        // userLogged = Object.assign({}, foundUser) -> otra forma de copiar objetos
        
        resetPage(loginPage)

    } catch(error){
        if(error.cause === 'ownError'){
            loginPage.querySelector('.red-text').textContent = error.message
        } else {
            console.log(error)
        }
    }
})

document.querySelector('.register-now-button').addEventListener('click', (event) => {
    event.preventDefault()
    hideElement(loginPage)
    resetPage(registerPage)
    showElement(registerPage)
})