import { show, hide, toggle, context } from "../ui.js"
import { updatePassword } from "../logic/updatePassword.js"
import { updateEmail } from "../logic/updateEmail.js"
import { getImageFromLocal } from "../logic/getImageFromLocal.js"
import { loginPage } from "./login-page.js"
import { findUserbyId, retrieveUser } from "../logic/helpers/data-managers.js"
import { createPost } from "../logic/createPost.js"
import { posts, savePostsInStorage, saveUsersInStorage, users } from "../data.js"
import { updateAvatar } from "../logic/updateAvatar.js"
import { showPosts } from "../logic/showPosts.js"
import { showPostsInProfile } from "../logic/showPostsinProfile.js"



export const homePage = document.querySelector('.homepage')
const updatePasswordForm = homePage.querySelector('.update-password')
const updateEmailForm = homePage.querySelector('.update-mail')
const updateAvatarForm = homePage.querySelector('.update-avatar')
const sidebarActions = homePage.querySelector('.sidebar-actions')
export const settingSection = homePage.querySelector('.settings')
const settingsSectionMenu = homePage.querySelector('.settings-content')

export const feed = homePage.querySelector('.feed')
export const feedPost = feed.querySelector('.post')

const createPostModal = document.querySelector('.creation-post-modal')
const createPostForm = createPostModal.querySelector('form')

const profileSection = homePage.querySelector('.profile')
export const sidebarProfileRow = homePage.querySelector('.sidebar-profile')

export const editPostModal = document.querySelector('.edit-post-modal')


//Settings
sidebarActions.querySelector('.sidebar-settings').onclick = function (event) {
    event.preventDefault()

    show(settingsSectionMenu, settingSection)
    hide(feed, profileSection)
    hide(updateEmailForm, updatePasswordForm, updateAvatarForm)
}

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
    hide(homePage)
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
        updatePasswordForm.querySelector('.success-message').textContent = 'Your password has been updated!'
        saveUsersInStorage()
    } catch (error) {
        homePage.querySelector('.error-message').textContent = error.message
    } finally {
        updatePasswordForm.querySelector('input[name=currentPassword]').value = ''
        updatePasswordForm.querySelector('input[name=newPassword]').value = ''
        updatePasswordForm.querySelector('input[name=confirmNewPassword]').value = ''
        updatePasswordForm.querySelector('.success-message').textContent = ''
        homePage.querySelector('.error-message').textContent = ''

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
        updateEmailForm.querySelector('.success-message').textContent = "Your email has been updated!"
        saveUsersInStorage()
    } catch (error) {
        updateEmailForm.querySelector('.error-message').textContent = error.message
    } finally {
        updateEmailForm.querySelector('input[name=currentEmail]').value = ''
        updateEmailForm.querySelector('input[name=newEmail]').value = ''
        updateEmailForm.querySelector('input[name=confirmNewEmail]').value = ''
        updateEmailForm.querySelector('.success-message').textContent = ''
        updateEmailForm.querySelector('.error-message').textContent = ''
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
        homePage.querySelector('.update-avatar').querySelector('.error-message').textContent = error.message
    } finally{
        homePage.querySelector('.update-avatar').querySelector('.error-message').textContent = ''
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
        saveUsersInStorage()
        showPosts()
        homePage.querySelector('.update-avatar').querySelector('.success-message').textContent = 'Avatar updated!'
    } catch (error) {
        homePage.querySelector('.update-avatar').querySelector('.error-message').textContent = error.message
    } finally{
        homePage.querySelector('.update-avatar').querySelector('.error-message').innerHTML = ''
        homePage.querySelector('.update-avatar').querySelector('.success-message').innerHTML = ''
    }
})


homePage.querySelector('#cancel-update-avatar').addEventListener('click', function (event) {
    event.preventDefault()

    hide(updateAvatarForm)
    show(settingsSectionMenu)
    toggle(updateAvatarForm.querySelector('.error-message'))
})

// Create new post

// new post image preview
createPostForm.querySelector('input[name=imageUrl]').addEventListener('change', function (event) {
    event.preventDefault()

    const uploadedFile = event.target.files[0]
    const imagePreview = createPostForm.querySelector('.update-avatar-image-preview')
    try {
        getImageFromLocal(uploadedFile, imageUrl => {
            const srcData = imageUrl
            imagePreview.src = srcData
        })
    } catch (error) {
        createPostForm.querySelector('.error-message').textContent = error.message
    } finally{
        createPostForm.querySelector('.error-message').textContent = ''
    }
})
//Confirm create new post
homePage.querySelector('.create-post-button').onclick = () => {
    show(createPostModal)
}

createPostForm.querySelector('#post-publication').onclick = (event) => {
    event.preventDefault()

    const image = createPostForm.querySelector('.update-avatar-image-preview').src
    const caption = createPostForm.querySelector('input[name=caption]').value

    try {
        createPost(context.userId, image, caption)
        createPostForm.querySelector('.success-message').textContent = 'Post created'
        showPosts()
        hide(createPostModal)
    } catch (error) {
        createPostForm.querySelector('.error-message').textContent = error.message
    } finally{
        createPostForm.querySelector('.success-message').innerHTML = ''
        createPostForm.querySelector('.error-message').innerHTML = ''
    }
}

createPostForm.querySelector('#cancel-post-publication').onclick = (event) => {
    event.preventDefault()
    hide(createPostModal)
}

//Go to profile
homePage.querySelector('.sidebar-profile').onclick = () => {


    try {
        const user = retrieveUser(context.userId)
        profileSection.querySelector('.personal-profile-image').src = user.avatar
        profileSection.querySelector('.personal-profile-username').innerHTML = user.username
        hide(feed)
        showPostsInProfile()
        show(profileSection)

    } catch (error) {
        alert(error)
    }
}

//Go to home
homePage.querySelector('.sidebar-home').onclick = () => {
    hide(profileSection, settingSection)
    show(feed)
}

export function renderUser() {
    const user = retrieveUser(context.userId)

    sidebarProfileRow.querySelector('.sidebar-profile-username').innerHTML = user.username
    sidebarProfileRow.querySelector('.sidebar-profile-email').innerHTML = user.email
    sidebarProfileRow.querySelector('.sidebar-avatar').src = user.avatar
}

//Edit post
editPostModal.querySelector('input[type=file]').addEventListener('change', function(event){
    event.preventDefault()
    const uploadedFile = event.target.files[0]
    const imagePreview = editPostModal.querySelector('.update-avatar-image-preview')
    try{
        getImageFromLocal(uploadedFile, imageUrl => {
            const srcData = imageUrl
            imagePreview.src = srcData
        })
    } catch(error){
        editPostModal.querySelector('.error-message').textContent = error.message
    } finally {
        editPostModal.querySelector('.error-message').innerHTML = ''
    }
})

editPostModal.querySelector('#save-edit-post').onclick = (event) => {
    event.preventDefault()

    const postId = editPostModal.querySelector('input[type=hidden]').value
    const postImgSrc = editPostModal.querySelector('.edit-post-image-preview').src
    const postCaption = editPostModal.querySelector('.text-area').value

    const post = posts.find(post => post.id === postId)

    try{
        post.image = postImgSrc
        post.text = postCaption
        setTimeout(hide(editPostModal), 10000)
        savePostsInStorage()
        showPosts()
        editPostModal.querySelector('.success-message').innerHTML = 'Post updated'
    } catch(error){
        editPostModal.querySelector('.error-message').innerHTML = error.message
    } finally {
        editPostModal.querySelector('.success-message').innerHTML = ''
        editPostModal.querySelector('.success-message').innerHTML = ''
    }
}

editPostModal.querySelector('#cancel-edit-post').onclick = (event) => {
    event.preventDefault()
    hide(editPostModal)
}

// [INTERNAL] delete likedPosts
homePage.querySelector('.delete').onclick = () => {
    users.forEach(user => user.likedPosts = [])
    saveUsersInStorage()

    posts.forEach(post => delete post.likes)
    savePostsInStorage()
}

