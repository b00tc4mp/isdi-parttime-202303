import { loginPage } from "./login-page.js"
import { updateUserPassword, updateUserEmail, updateUsername } from "../logic.js"
import { showHideContainer, closeProfilePages, context } from "../ui.js"

export const homePage = document.querySelector('.home')
export const homePageProfile = homePage.querySelector('.home__profile')
export const homePagePassword = homePage.querySelector('.home__password')
export const homePageUsername = homePage.querySelector('.home__username')
export const homePageEmail = homePage.querySelector('.home__email')
export const homePageMain = homePage.querySelector('.home__main')

homePage.querySelector('.password__form').onsubmit = function(event) {
    event.preventDefault()

    const oldPassword = event.target.oldPassword.value
    const newPassword = event.target.newPassword.value
    const confirmedPassword = event.target.newPasswordConfirmation.value
    const email = context.userID

    try {
        updateUserPassword(email, oldPassword, newPassword, confirmedPassword)

        homePageProfile.classList.remove('off')
        homePagePassword.classList.add('off')
        homePage.querySelector('.password__form').reset()
    } catch (error) {
        alert(error.message)
    } 
}

homePage.querySelector('.email__form').onsubmit = function(event) {
    event.preventDefault()

    const oldEmail = event.target.oldEmail.value
    const newEmail = event.target.newEmail.value
    const confirmedEmail = event.target.newEmailConfirmation.value
    const password = event.target.emailPassword.value

    try {
        updateUserEmail(oldEmail, newEmail, confirmedEmail, password)

        homePageProfile.classList.remove('off')
        homePageEmail.classList.add('off')
        homePage.querySelector('.email__form').reset()
    } catch (error) {
        alert(error.message)
    }
}

homePage.querySelector('.username__form').onsubmit = function(event) {
    event.preventDefault()

    const oldUsername = event.target.oldUsername.value
    const newUsername = event.target.newUsername.value
    const password = event.target.password.value
    const email = context.userID

    try {
        updateUsername(email, oldUsername, newUsername, password)

        homePageProfile.classList.remove('off')
        homePageUsername.classList.add('off')
        homePage.querySelector('.username__form').reset()
    } catch (error) {
        alert(error.message)
    }
}

homePage.querySelector('.home__anchor--profile').onclick = function(event) {
    event.preventDefault()
    closeProfilePages()
    if (homePageProfile.classList.contains('off')) {
        homePageMain.classList.add('off')
        homePageProfile.classList.remove('off')
    } else {
        homePageMain.classList.remove('off')
        homePageProfile.classList.add('off')
    }
}

homePage.querySelector('.profile__anchor--home').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageMain, homePageProfile)
}

homePage.querySelector('.profile__anchor--password').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageProfile, homePagePassword)
}

homePage.querySelector('.profile__anchor--email').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageProfile, homePageEmail)
}

homePage.querySelector('.profile__anchor--username').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageProfile, homePageUsername)
}

homePage.querySelector('.navigation__anchor--logout').onclick = function(event) {
    event.preventDefault()
    
    closeProfilePages()
    homePage.classList.add('off')
    homePageProfile.classList.add('off')
    homePageMain.classList.remove('off')
    loginPage.classList.remove('off')

    context.userID = null
    //loggedUserName = {}
}

homePage.querySelector('.password__anchor--profile').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePagePassword, homePageProfile)
    homePagePassword.querySelector('.password__form').reset()
}

homePage.querySelector('.email__anchor--profile').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageEmail, homePageProfile)
    homePageEmail.querySelector('.email__form').reset()
}

homePage.querySelector('.username__anchor--profile').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageUsername, homePageProfile)
    homePageUsername.querySelector('.username__form').reset()
}