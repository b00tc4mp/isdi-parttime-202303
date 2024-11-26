console.log('load home-page')

import { show, hide, context } from "../ui.mjs"
import { loginPage } from "./login-page.mjs"
import { updateUserAvatar, validatedNewPassword } from "../logic.mjs"

export const DEFAULT_AVATAR_URL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"

export const homePage= document.querySelector('.home')
export const homeMenu = homePage.querySelector('.home-header').querySelector('.home-menu')
export const myProfileLink = homeMenu.querySelector('.myProfile')
export const avatarImage =homeMenu.querySelector('.home-header-avatar')

const homeProfileEdit = homePage.querySelector('.profile-edit') 
const homeProfileEditAvatarForm= homeProfileEdit.querySelector('.profile-edit-avatar-form')
const homeProfileEditPasswordForm = homePage.querySelector('.profile-edit-password-form')



//HOME PAGE

//Menu my Profile
// configurate home--button myprofile--con anchor

myProfileLink.onclick = function(event){
    event.preventDefault()

   show(homeProfileEdit)
}



//configurate home--button--update avatar --con anchor

homeProfileEdit.querySelector('.updateAvatar').onclick = function(event){
    event.preventDefault()
    show(homeProfileEdit.querySelector('.profile-edit-avatar-form'))
}


//configurate home--button--update password --con anchor

homeProfileEdit.querySelector('.updatePassword').onclick = function(event){
    event.preventDefault()

    show(homeProfileEdit.querySelector('.profile-edit-password'))
}



//configurate form to change avatar

homeProfileEditAvatarForm.onsubmit = function (event){
    event.preventDefault()

    const newAvatar = event.target.avatarUrl.value
    
    //otras formas de hacerlo 
    //const url1 = event.target.avatar-url.value (la mas usual) 
    //const url2= homeProfileEdit.querySelector('profile-edit-avatar-form').avatar-url.value 
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
        validatedNewPassword (context.userId  , password, userNewPassword, userConfirmNewPassword)

    
    alert('your new password has been validated')
    }catch(error) {
        alert(error.message)
    }
    
    homeProfileEditPasswordForm.reset()
    hide(homeProfileEdit.querySelector('.profile-edit-password'))
}

console.log('load main') 

//home-header-Logout 

homePage.querySelector('.home-header').querySelector('.home-header-logout').querySelector('.logout').onclick = function(event) {
    event.preventDefault() //no sería necesario al estar fuera de un formulario, podriamos omitirlo

    context.userId = null
    avatarImage.src = DEFAULT_AVATAR_URL
    
    hide(homePage, homeProfileEdit, homeProfileEditAvatarForm, homeProfileEditPasswordForm)
    show(loginPage)
}
