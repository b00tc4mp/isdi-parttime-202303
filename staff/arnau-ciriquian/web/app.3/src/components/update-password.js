import { updateUserPassword } from "../logic/update-user-password"
import { showHideContainer, context } from "../ui"
import { homePageProfile } from "../pages/home-page"


export default function initUpdatePassword(homePage) {
    const homePagePassword = homePage.querySelector('.home__password')

    homePage.querySelector('.password__form').onsubmit = function(event) {
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

    return homePagePassword
}