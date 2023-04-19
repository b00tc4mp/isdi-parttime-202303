import { updateUserPassword } from "../logic/update-user-password.js"
import { showHideContainer } from "../ui.js"
import { homePage } from "../pages/home-page.js"

homePage.querySelector('.password__form').onsubmit = function(event) {
    debugger
    event.preventDefault()

    const oldPassword = event.target.oldPassword.value
    const newPassword = event.target.newPassword.value
    const confirmedPassword = event.target.newPasswordConfirmation.value

    try {
        updateUserPassword(context.userID, oldPassword, newPassword, confirmedPassword)
        alert('password updated')

        showHideContainer(homePageProfile, homePagePassword)
        homePage.querySelector('.password__form').reset()
    } catch (error) {
        alert(error.message)
    } 
}