import { context, show, hide } from "../ui.js"
import { homePage } from "../pages/home-page"
import { updateUserAvatar } from "../logic/update-user-avatar.js"
import { validatedNewPassword } from "../logic/validated-user-newpassword.js"

export default function initProfilePanel(homePage, avatarImage) {
    const homeProfileEdit = homePage.querySelector('.profile-edit')
    const homeProfileEditAvatarForm= homeProfileEdit.querySelector('.profile-edit-avatar-form')
    const homeProfileEditPasswordForm = homePage.querySelector('.profile-edit-password-form')


    //configurate home--button--update avatar --con anchor

    homeProfileEdit.querySelector('.updateAvatar').onclick = function(event){
        event.preventDefault()
        show(homeProfileEdit.querySelector('.profile-edit-avatar-form'))
    }


    //configurate home--button--update password --con anchor

    homeProfileEdit.querySelector('.updatePassword').onclick = function(event)  {
        event.preventDefault()

        show(homeProfileEdit.querySelector('.profile-edit-password'))
    }


    //configurate form to change avatar

    homeProfileEditAvatarForm.onsubmit = function (event){
        event.preventDefault()

        const newAvatar = event.target.avatarUrl.value

        //otras formas de hacerlo 
        //const url1 = event.target.avatar-url.value (la mas usual) 
        //const url2= homeProfileEdit.querySelector ('profile-edit-avatar-form').avatar-url.value 
        //const url3 = this.avatar-url.value //(no recomendado)

        try{
            updateUserAvatar(context.userId , newAvatar)
        
            alert('your avatar has been updated')
            avatarImage.src = newAvatar

        }catch(error) {
            alert(error.message)
        }
        homeProfileEditAvatarForm.reset()
        hide(homeProfileEditAvatarForm)
    }

    //configurate form to change password (3 inputs)

    homeProfileEditPasswordForm.onsubmit = function(event){
        event.preventDefault()

        const password= event.target.password.value
        const userNewPassword = event.target.newPassword.value
        const userConfirmNewPassword = event.target.confirmNewPassword.value

        try{
            validatedNewPassword (context.userId  , password,   userNewPassword, userConfirmNewPassword)

        
        alert('your new password has been validated')
        }catch(error) {
            alert(error.message)
        }

        homeProfileEditPasswordForm.reset()
        hide(homeProfileEdit.querySelector('.profile-edit-password'))
    }
    return { homeProfileEdit, homeProfileEditAvatarForm, homeProfileEditPasswordForm}
}
