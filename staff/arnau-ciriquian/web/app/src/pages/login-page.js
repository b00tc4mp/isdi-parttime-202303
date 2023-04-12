import { authenticateUser } from "../logic/authenticate-user.js"
import { getLoggedUser } from "../logic/login-user.js"
import { context, showHideContainer  } from "../ui.js"
import { registerPage } from "./register-page.js"
import { homePage, homePageMain, DEFAULT_AVATAR_URL, avatarImage, renderUser } from "./home-page.js"
import { showPostFeed } from "../logic/show-post-feed.js"

export const loginPage = document.querySelector('.login')

loginPage.querySelector('form').onsubmit = function(event) {
    event.preventDefault()
    
    const email = event.target.email.value
    const password = event.target.password.value

    try {
        context.userID = authenticateUser(email, password)
        
        renderUser()
        
        showHideContainer(loginPage, homePage, homePageMain)
        // loginPage.classList.add('off')
        // homePage.classList.remove('off')
        // homePageMain.classList.remove('off')
        
        homePageMain.querySelector('.home__post--feed').innerHTML = showPostFeed(context.userID, 'user id')

        loginPage.querySelector('form').reset()
    } catch (error) {
        alert(error.message)
    }
}

loginPage.querySelector('.login__anchor--register').onclick = function(event) {
    event.preventDefault()

    showHideContainer(registerPage, loginPage)
    loginPage.querySelector('.login__form').reset()
}