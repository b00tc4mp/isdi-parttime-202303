import { authenticateUser } from "../logic/authenticate-user"
import { getLoggedUser } from "../logic/login-user"
import { context, showHideContainer  } from "../ui"
import { registerPage } from "./register-page"
import { homePage, homePageMain, DEFAULT_AVATAR_URL, avatarImage } from "./home-page"
import { showPostFeed } from "../logic/show-post-feed"

export const loginPage = document.querySelector('.login')

loginPage.querySelector('form').onsubmit = function(event) {
    event.preventDefault()
    
    const email = event.target.email.value
    const password = event.target.password.value

    try {
        context.userID = authenticateUser(email, password)
        const foundUser = getLoggedUser(context.userID)

        avatarImage.src = foundUser.avatar? foundUser.avatar : DEFAULT_AVATAR_URL

        loginPage.classList.add('off')
        homePage.classList.remove('off')
        homePageMain.classList.remove('off')
        homePage.querySelector('.home__anchor--profile').innerText = foundUser.name

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