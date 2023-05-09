import { authenticateUser } from "../logic/authenticate-user" 
import { context, showHideContainer  } from "../ui"
import { registerPage } from "./register-page"
import { homePage, homePageMain, renderUser } from "./home-page"
import showPostFeed from "../logic/show-post-feed"

export const loginPage = document.querySelector('.login')

loginPage.querySelector('form').onsubmit = function(event) {
    event.preventDefault()
    
    const email = event.target.email.value
    const password = event.target.password.value

    try {
        context.userID = authenticateUser(email, password)
        
        renderUser()
        showPostFeed()

        showHideContainer(loginPage, homePage)
        homePageMain.classList.remove('off')

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