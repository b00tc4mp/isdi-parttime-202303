console.log('load login page')

import authenticateUser from '../logic/authenticate-user.js'
import { context, resetPage, hideElement, showElement } from '../ui.js'
import { registerPage } from './register-page.js'
import { homePage, renderPosts, renderUsers } from './home-page.js'
import initProfilePanel from '../components/profile-panel.js'
 

export const loginPage = document.querySelector('.login-page')

loginPage.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const userEmail = loginPage.querySelector('.input-field[name=email]').value.toLowerCase()
    const userPassword = loginPage.querySelector('.input-field[name=password]').value

    
    try {
        
        context.userId = authenticateUser(userEmail, userPassword)

        renderUsers()

        renderPosts()

        resetPage(loginPage)

        showElement(homePage)
        
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