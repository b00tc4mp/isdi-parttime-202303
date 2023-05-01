import { updateAvatar } from "../logic/updateAvatar.js"
import { showPosts } from "../logic/showPosts.js"
import { updatePassword } from "../logic/updatePassword.js"
import { updateEmail } from "../logic/updateEmail.js"
import { getImageFromLocal } from "../logic/getImageFromLocal.js"
import { findUserbyId, retrieveUser } from "../logic/helpers/data-managers.js"
import { hide, show, context, successToast } from "../ui.js"
import { renderUser } from "../logic/renderUser.js"

export function initSettingsSection(homePage){

const profileSection = homePage.querySelector('.profile')
const updatePasswordForm = homePage.querySelector('.update-password')
const updateEmailForm = homePage.querySelector('.update-mail')
const updateAvatarForm = homePage.querySelector('.update-avatar')
const settingSection = homePage.querySelector('.settings')
const settingsSectionMenu = homePage.querySelector('.settings-content')


settingSection.querySelector('.nav-row-email').onclick = function (event) {
    event.preventDefault()

    hide(settingsSectionMenu)
    show(updateEmailForm)
}
settingSection.querySelector('.nav-row-password').onclick = function (event) {
    event.preventDefault()

    hide(settingsSectionMenu)
    show(updatePasswordForm)
}

settingSection.querySelector('.nav-row-avatar').onclick = function (event) {
    event.preventDefault()

    hide(settingsSectionMenu)
    show(updateAvatarForm)
}

//Logout link
settingsSectionMenu.querySelector('.logout-link').onclick = function (event) {
    event.preventDefault()

    delete context.userId
    hide(homePage, settingSection)
    show(loginPage)
}

//Confirm update password
homePage.querySelector('#save-update-password').addEventListener('click', function (event) {
    event.preventDefault()

    const currentPassword = homePage.querySelector('input[name=currentPassword]').value
    const newPassword = homePage.querySelector('input[name=newPassword]').value
    const confirmNewPassword = homePage.querySelector('input[name=confirmNewPassword]').value


    try {
        updatePassword(context.userId, currentPassword, newPassword, confirmNewPassword)
        generateToast({
            message: 'Your password has been updated!',
            type: successToast, 
            length: '3000ms'
        })
    } catch (error) {
        generateToast({
            message: error.message,
            type: errorToast, 
            length: '3000ms'
        })
    } finally {
        updatePasswordForm.querySelector('input[name=currentPassword]').value = ''
        updatePasswordForm.querySelector('input[name=newPassword]').value = ''
        updatePasswordForm.querySelector('input[name=confirmNewPassword]').value = ''
    }
})


homePage.querySelector('#cancel-update-password').addEventListener('click', function (event) {
    event.preventDefault()

    hide(updatePasswordForm)
    show(settingsSectionMenu)
})

//Confirm update mail
homePage.querySelector('#save-update-email').addEventListener('click', function (event) {
    event.preventDefault()

    const currentEmail = homePage.querySelector('input[name=currentEmail]').value
    const newEmail = homePage.querySelector('input[name=newEmail]').value
    const confirmNewEmail = homePage.querySelector('input[name=confirmNewEmail]').value

    const user = findUserbyId(context.userId)

    try {
        updateEmail(user.email, currentEmail, newEmail, confirmNewEmail)
        generateToast({
            message: 'Your email has been updated!',
            type: successToast, 
            length: '3000ms'
        })
        renderUser()
    } catch (error) {
        generateToast({
            message: error.message,
            type: errorToast, 
            length: '3000ms'
        })
    } finally {
        updateEmailForm.querySelector('input[name=currentEmail]').value = ''
        updateEmailForm.querySelector('input[name=newEmail]').value = ''
        updateEmailForm.querySelector('input[name=confirmNewEmail]').value = ''

    }
})

homePage.querySelector('#cancel-update-email').addEventListener('click', function (event) {
    event.preventDefault()

    hide(updateEmailForm)
    show(settingsSectionMenu)
})

// Update avatar image preview
homePage.querySelector('.update-avatar').querySelector('input[name=avatar]').addEventListener('change', function (event) {

    event.preventDefault()
    const uploadedFile = event.target.files[0]
    const imagePreview = updateAvatarForm.querySelector('.update-avatar-image-preview')
    try {
        getImageFromLocal(uploadedFile, imageUrl => {
            const srcData = imageUrl
            imagePreview.src = srcData
        })
    } catch (error) {
        generateToast({
            message: error.message,
            type: errorToast, 
            length: '3000ms'
        })
    }
})

// Confirm update avatar
updateAvatarForm.querySelector('#save-update-avatar').addEventListener('click', function (event) {
    event.preventDefault()

    const localImage = updateAvatarForm.querySelector('.update-avatar-image-preview').src
    const user = retrieveUser(context.userId)

    try {

        const image = updateAvatar(context.userId, localImage)
        homePage.querySelector('.sidebar-avatar').src = image
        context.userAvatar = image
        user.avatar = image
        showPosts()
        generateToast({
            message: 'Avatar updated!',
            type: successToast, 
            length: '3000ms'
        })
    } catch (error) {
        generateToast({
            message: error.message,
            type: errorToast, 
            length: '3000ms'
        })
    }
})


homePage.querySelector('#cancel-update-avatar').addEventListener('click', function (event) {
    event.preventDefault()

    hide(updateAvatarForm)
    show(settingsSectionMenu)
})

return { profileSection, settingSection, settingsSectionMenu, updateEmailForm, updatePasswordForm, updateAvatarForm }
}