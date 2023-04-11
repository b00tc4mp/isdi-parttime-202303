console.log('load login page')

import authenticateUser from '../logic/authenticate-user.js'
import { retrieveUser } from '../logic/retrieve-user.js'
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
        
        goToHomePage(homePage, user, avatarImg)
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

const goToHomePage = (homePage, user, avatarImg) => {
    homePage.classList.remove('off')
    homePage.querySelector('a[name=my-profile]').textContent =`${user.name}`
    if(user.avatar)
        avatarImg.src = user.avatar
}