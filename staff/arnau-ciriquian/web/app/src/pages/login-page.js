import { authenticateUser } from "../logic/authenticate-user.js"
import { getLoggedUser } from "../logic/login-user.js"
import { context, showHideContainer  } from "../ui.js"
import { registerPage } from "./register-page.js"
import { homePage, homePageMain } from "./home-page.js"

export const loginPage = document.querySelector('.login')

loginPage.querySelector('form').onsubmit = function(event) {
    event.preventDefault()
    
    const email = event.target.email.value
    const password = event.target.password.value

    try {
        context.userID = authenticateUser(email, password)
        const foundUser = getLoggedUser(context.userID)

        // avatarImage.src = user.avatar? user.avatar : DEFAULT_AVATAR_URL

        loginPage.classList.add('off')
        homePage.classList.remove('off')
        homePageMain.classList.remove('off')
        homePage.querySelector('.home__anchor--profile').innerText = foundUser.name
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