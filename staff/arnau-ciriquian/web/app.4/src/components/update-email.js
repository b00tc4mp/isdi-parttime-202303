import { updateUserEmail } from "../logic/update-user-email.js"
import { context, showHideContainer } from "../ui.js"
import { homePageProfile } from "../pages/home-page.js"

export default function initUpdateEmail(homePage) {
    const homePageEmail = homePage.querySelector('.home__email')
    
    homePage.querySelector('.email__form').onsubmit = function(event) {
        event.preventDefault()
    
        const oldEmail = event.target.oldEmail.value
        const newEmail = event.target.newEmail.value
        const confirmedEmail = event.target.newEmailConfirmation.value
        const password = event.target.emailPassword.value
    
        try {
            updateUserEmail(context.userID, oldEmail, newEmail, confirmedEmail, password)
            alert('email updated')
    
            showHideContainer(homePageProfile, homePageEmail)
            homePage.querySelector('.email__form').reset()
        } catch (error) {
            alert(error.message)
        }
    }

    return homePageEmail
}