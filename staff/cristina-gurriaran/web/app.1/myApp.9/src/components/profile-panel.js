// import { homePage } from "../pages/home-page.mjs"
import updateUserAvatar from '../logic/update-user-avatar.mjs'
import updateUserPassword from '../logic/update-user-password.mjs'
import { context } from '../ui.mjs'

export default function initProfilePanel(homePage, avatarImage){

    const profilePanel = homePage.querySelector('.profile')
    const updateUserAvatarForm = profilePanel.querySelector ('.profile-avatar-form')
    const updateUserPasswordForm = profilePanel.querySelector('.profile-password-form')

    updateUserAvatarForm.onsubmit = function (event) {
        event.preventDefault()

        const url = event.target.url.value

        try {
            updateUserAvatar(context.userId, url)
            alert ('avatar succesfully updated')
            avatarImage.src = url
            updateUserAvatarForm.reset()

        } catch (error) {
            alert(error.message)
        }
    }


    updateUserPasswordForm.onsubmit = function (event) {
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        try {
            updateUserPassword(context.userId, password, newPassword,newPasswordConfirm)

            alert('Password succesfully updated')
            updateUserPasswordForm.reset()

        } catch (error) {
            alert(error.message)
        } 
    }

    return profilePanel
}

