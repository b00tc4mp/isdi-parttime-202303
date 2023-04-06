import { users } from "./data.js"
import { show, hide, toggle } from "./ui.js"
import { registerUser, checkCredentials, updatePassword, updateEmail, updateAvatar } from "./logic.js"

const registrationPage = document.querySelector('.registration')
const registerForm = registrationPage.querySelector('form')

const loginPage = document.querySelector('.login')
const loginForm = loginPage.querySelector('form')

const homePage = document.querySelector('.homepage')
const updatePasswordForm = homePage.querySelector('.update-password')
const updateEmailForm = homePage.querySelector('.update-mail')
const updateAvatarForm = homePage.querySelector('.update-avatar')
const topbarProfileRow = homePage.querySelector('.topbar-profile')
const topbarActions =  homePage.querySelector('.topbar-actions')
const homeProfile = homePage.querySelector('.profile') 

let authenticatedName
let authenticatedEmail
let authenticatedAvatar
let authenticatedId

//Registration
registerForm.onsubmit = function(event){
    event.preventDefault()
    
   const registrationName = registrationPage.querySelector('input[name=username]').value
   const registrationEmail = registrationPage.querySelector('input[name=email]').value
   const registrationPassword = registrationPage.querySelector('input[name=password]').value
   const registrationRepPassword = registrationPage.querySelector('input[name=rep-password]').value

   try {
    registerUser(registrationName, registrationEmail, registrationPassword,registrationRepPassword)
    hide(registrationPage)
    show(loginPage)
   } catch (error) {
    registrationPage.querySelector('.error-message').textContent = error.message
   }
   finally {
    registrationPage.querySelector('input[name=password]').value = ''
    registrationPage.querySelector('input[name=rep-password]').value = ''
   }
}

//Already an account
registrationPage.querySelector('a').addEventListener('click', function(event){
    event.preventDefault()
    hide(registrationPage)
    show(loginPage)
})

//Back to register
loginPage.querySelector('.create-account').querySelector('.link').addEventListener('click', function(event){
    event.preventDefault()

    hide(loginPage)
    show(registrationPage)
})

//Login
loginForm.onsubmit = function(event){
    event.preventDefault()

    const inputEmail = event.target.email.value
    const inputPassword = event.target.password.value

    try{
        checkCredentials(inputEmail, inputPassword)
        authenticatedEmail = inputEmail
        authenticatedName = users.find((user) => user.email === authenticatedEmail).username
        authenticatedId = users.find((user) => user.email === authenticatedEmail).id
        authenticatedAvatar = users.find((user => user.email === authenticatedEmail)).avatar

        hide(loginPage)
        show(homePage)
        topbarProfileRow.querySelector('.topbar-profile-username').innerHTML = authenticatedName
        topbarProfileRow.querySelector('.topbar-profile-email').innerHTML = authenticatedEmail
    } catch (error) {
        loginPage.querySelector('.error-message').textContent = error.message
    } finally {
        loginPage.querySelector('input[name=password]').value= ''
        hide(homeProfile)
    }
}

topbarActions.querySelector('.topbar-settings').onclick = function(event){
    event.preventDefault()

    toggle(homeProfile)
    hide(updateEmailForm, updatePasswordForm, updateAvatarForm)
}

homeProfile.querySelector('.nav-row-email').onclick = function(event){
    event.preventDefault()

    hide(homeProfile)
    show(updateEmailForm)
}
homeProfile.querySelector('.nav-row-password').onclick = function(event){
    event.preventDefault()

    hide(homeProfile)
    show(updatePasswordForm)
}

homeProfile.querySelector('.nav-row-avatar').onclick = function(event){
    event.preventDefault()

    hide(homeProfile)
    show(updateAvatarForm)
}

homeProfile.querySelector('.link').onclick = function(event){
    event.preventDefault()

    hide(homePage)
    show(loginPage)
}

//Confirm update password
homePage.querySelector('#save-update-password').addEventListener('click', function(event){
    event.preventDefault()

    const currentPassword = homePage.querySelector('input[name=currentPassword]').value
    const newPassword = homePage.querySelector('input[name=newPassword]').value
    const confirmNewPassword = homePage.querySelector('input[name=confirmNewPassword]').value
    

    try{
        updatePassword(authenticatedId, currentPassword, newPassword, confirmNewPassword)
        updatePasswordForm.querySelector('.success-message').textContent = "Your password has been updated!"
    } catch (error) {
        homePage.querySelector('.error-message').textContent = error.message
    } finally {
        updatePasswordForm.querySelector('input[name=currentPassword]').value= ''
        updatePasswordForm.querySelector('input[name=newPassword]').value = ''
        updatePasswordForm.querySelector('input[name=confirmNewPassword]').value = ''
    } 
})


homePage.querySelector('#cancel-update-password').addEventListener('click', function(event){
    event.preventDefault()

    hide(updatePasswordForm)
    show(homeProfile)
})

//Confirm update mail
homePage.querySelector('#save-update-email').addEventListener('click', function(event){
    event.preventDefault()

    const currentEmail = homePage.querySelector('input[name=currentEmail]').value
    const newEmail = homePage.querySelector('input[name=newEmail]').value
    const confirmNewEmail = homePage.querySelector('input[name=confirmNewEmail]').value

    try {
        updateEmail(authenticatedEmail, currentEmail, newEmail, confirmNewEmail)
        updateEmailForm.querySelector('.success-message').textContent = "Your email has been updated!"
    } catch (error) {
        updateEmailForm.querySelector('.error-message').textContent = error.message
    } finally {
        updateEmailForm.querySelector('input[name=currentEmail]').value = ""
        updateEmailForm.querySelector('input[name=newEmail]').value = ""
        updateEmailForm.querySelector('input[name=confirmNewEmail]').value = ""
    }
})

homePage.querySelector('#cancel-update-email').addEventListener('click', function(event){
    event.preventDefault()

    hide(updateEmailForm)
    show(homeProfile)
})

// Confirm update avatar
updateAvatarForm.querySelector('#save-update-avatar').addEventListener('click', function(event){
    event.preventDefault()

    const avatarUrl = homePage.querySelector('.update-avatar').querySelector('input[name=avatar]').value

    try{
        updateAvatar(authenticatedId, avatarUrl)
        
        alert('avatar updated')
        homePage.querySelector('.topbar-avatar').src = avatarUrl
        authenticatedAvatar = avatarUrl
        updateAvatarForm.querySelector('.update-avatar-image-preview').src = avatarUrl
    } catch (error){
        homePage.querySelector('.update-avatar').querySelector('.error-message').textContent = error.message
    }
})

// new update avatar
// homePage.querySelector('.update-avatar').querySelector('input[name=avatar]').addEventListener('change', function(event){

//     event.preventDefault()
//     const uploadedFile = event.target.files

//     try{
//         const srcData = updateAvatar(authenticatedEmail, uploadedFile)
//         updateAvatarForm.querySelector('.update-avatar-image-preview').src = srcData
//         authenticatedAvatar = srcData
//     } catch(error){
//         homePage.querySelector('.update-avatar').querySelector('.error-message').textContent = error.message
//     }
// })


homePage.querySelector('#cancel-update-avatar').addEventListener('click', function(event){
    event.preventDefault()

    hide(updateAvatarForm)
    show(homeProfile)
    toggle(updateAvatarForm.querySelector('.error-message'))
})