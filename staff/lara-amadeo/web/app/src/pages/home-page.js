import { show, hide, toggle, context } from "../ui.js"
import { updatePassword } from "../logic/updatePassword.js"
import { updateEmail } from "../logic/updateEmail.js"
import { getImageFromLocal } from "../logic/getImageFromLocal.js"
import { loginPage } from "./login-page.js"
import { findUserbyId } from "../logic/helpers/data-managers.js"
import { createPost } from "../logic/createPost.js" 
import { posts } from "../data.js"
import { updateAvatar } from "../logic/updateAvatar.js"


export const homePage = document.querySelector('.homepage')
const updatePasswordForm = homePage.querySelector('.update-password')
const updateEmailForm = homePage.querySelector('.update-mail')
const updateAvatarForm = homePage.querySelector('.update-avatar')
const topbarActions =  homePage.querySelector('.topbar-actions')
export const homeProfile = homePage.querySelector('.settings')

export const feed = homePage.querySelector('.feed')
export const feedPost = feed.querySelector('.post')

const createPostModal = document.querySelector('.creation-post-modal')
const createPostForm = createPostModal.querySelector('form')



topbarActions.querySelector('.topbar-settings').onclick = function(event){
    event.preventDefault()

    toggle(homeProfile)
    toggle(feed)
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
        updatePassword(context.userId, currentPassword, newPassword, confirmNewPassword)
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

    const user = findUserbyId(context.userId)

    try {
        updateEmail(user.email, currentEmail, newEmail, confirmNewEmail)
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

// Update avatar image preview
homePage.querySelector('.update-avatar').querySelector('input[name=avatar]').addEventListener('change', function(event){

    event.preventDefault()
    const uploadedFile = event.target.files[0]

    try{
        const srcData = getImageFromLocal(uploadedFile)
        updateAvatarForm.querySelector('.update-avatar-image-preview').src = srcData
    } catch(error){
        homePage.querySelector('.update-avatar').querySelector('.error-message').textContent = error.message
    }
})

// Confirm update avatar
updateAvatarForm.querySelector('#save-update-avatar').addEventListener('click', function(event){
    event.preventDefault()

    const localImage = updateAvatarForm.querySelector('.update-avatar-image-preview').src

    try{
        const image = updateAvatar(localImage)
        homePage.querySelector('.topbar-avatar').src = image
        homePage.querySelector('.update-avatar').querySelector('.success-message').textContent = 'Avatar updated!'
    } catch(error){
        homePage.querySelector('.update-avatar').querySelector('.error-message').textContent = error.message
    }
})


homePage.querySelector('#cancel-update-avatar').addEventListener('click', function(event){
    event.preventDefault()

    hide(updateAvatarForm)
    show(homeProfile)
    toggle(updateAvatarForm.querySelector('.error-message'))
})


// Create new post
homePage.querySelector('.create-post-button').onclick = () =>{
    show(createPostModal)
}

createPostForm.querySelector('#post-publication').onclick = (event) => {
    event.preventDefault()

    const image = createPostForm.querySelector('input[name=imageUrl]').value
    const caption = createPostForm.querySelector('input[name=caption]').value

    try{
        createPost(context.userId, image, caption)
        createPostForm.querySelector('.success-message').textContent = 'Post created'
        console.log(posts)

    } catch(error){
        createPostForm.querySelector('.error-message').textContent = error.message
    }
}

createPostForm.querySelector('#cancel-post-publication').onclick = (event) => {
    event.preventDefault()
    hide(createPostModal)
}