import updateUserAvatar from "../logic/update-user-avatar.js"
import updateUserPassword from "../logic/update-user-password.js"

import { context } from "../ui.js"
import { msAlert } from "../pages/alert-page.js"

export default function initProfilePanel(homePage, avatarImage) {
    const profilePanel = homePage.querySelector('.profile')
    const updateUserAvatarForm = profilePanel.querySelector('.profile-avatar-form')
    const updateUserPasswordForm = profilePanel.querySelector('.profile-password-form')

    updateUserAvatarForm.onsubmit = function (event) {
        event.preventDefault()

        const url = event.target.url.value

        try {
            updateUserAvatar(context.userId, url)

            msAlert("avatar updated")

            avatarImage.src = url
            
            updateUserAvatarForm.reset()
        } catch (error) {
            msAlert(error.message)
        }
    }


    updateUserPasswordForm.onsubmit = function (event) {
        event.preventDefault()

        event.target.password.classList.remove("imput-highlight")
        event.target.newPassword.classList.remove("imput-highlight")
        event.target.newPasswordConfirm.classList.remove("imput-highlight")

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        try {
            updateUserPassword(context.userId, password, newPassword, newPasswordConfirm)
            
            msAlert("the password is update")

            updateUserPasswordForm.reset()
        }
        catch (error) {
            msAlert(error.message)

            if (error.cause === "password") {
                event.target.newPassword.focus()
                event.target.password.classList.add("imput-highlight")
                event.target.newPassword.classList.add("imput-highlight")
            }
            else if (error.cause === "newPassword") { 
                event.target.newPassword.focus()
                event.target.newPassword.classList.add("imput-highlight")
            }
            else if (error.cause === "newPasswordConfirm") { 
                event.target.newPasswordConfirm.focus()
                event.target.newPasswordConfirm.classList.add("imput-highlight")
            }
        }
    }
    
    return profilePanel
}