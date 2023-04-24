import { loginPage } from "./login-page.js"
import { closeProfilePages, context, showHideContainer } from "../ui.js"
import initUpdatePassword from "../components/update-password.js"
import initUpdateEmail from "../components/update-email.js"
import initUpdateAvatar from "../components/update-avatar.js"
import initUpdateName from "../components/update-name.js"

import { createNewPost } from "../logic/create-new-post.js"
import { getLoggedUser } from "../logic/login-user.js"
import retrievePosts from "../logic/retrive-posts.js"
import { updatePost } from "../logic/update-post.js"

import spaceDogImage from "../../images/space-dog.svg"
export const DEFAULT_AVATAR_URL = spaceDogImage

export const homePage = document.querySelector('.home')
export const avatarImage = homePage.querySelector('.avatar')
const homePageAddPost = homePage.querySelector('.home__anchor--new-post')
export const homePagePost = homePage.querySelector('.home__post')
export const homePageProfile = homePage.querySelector('.home__profile')
export const homePageMain = homePage.querySelector('.home__main')
export const homePostEdit = homePage.querySelector('.home__post--edit')

export const homePagePassword = initUpdatePassword(homePage)
export const homePageUsername = initUpdateName(homePage)
export const homePageEmail = initUpdateEmail(homePage)
export const homePageAvatar = initUpdateAvatar(homePage)

homePageAddPost.onclick = function(event) {
    event.preventDefault()

    showHideContainer(homePageMain, homePagePost)
}

homePagePost.querySelector('.post__form').onsubmit = function(event) {
    event.preventDefault()

    const newPostImage = event.target.newPostImage.value
    const newPostText = event.target.newPostText.value

    try {
        createNewPost(context.userID, newPostImage, newPostText)
        
        homePagePost.querySelector('.post__form').reset()
        showHideContainer(homePagePost, homePageMain)
        retrievePosts(context.userID)
    } catch (error) {
        alert(error.message)
    }
    
    alert ('Posted!')
}

homePagePost.querySelector('.cancel__button').onclick = function() {
    homePagePost.querySelector('.post__form').reset()
    showHideContainer(homePagePost, homePageMain)
}

homePostEdit.querySelector('.post__form').onsubmit = function(event) {
    event.preventDefault()

    const newPostImage = event.target.newPostImage.value
    const newPostText = event.target.newPostText.value
    const postId = homePostEdit.querySelector('input[type=hidden]').value

    try {
        updatePost(context.userID, postId, newPostImage, newPostText)
        
        homePostEdit.querySelector('.post__form').reset()
        showHideContainer(homePostEdit, homePageMain)
        retrievePosts(context.userID)
    } catch (error) {
        alert(error.message)
    }
    
    alert ('Updated!')
}

homePostEdit.querySelector('.cancel__button').onclick = function() {
    homePostEdit.querySelector('.post__form').reset()
    showHideContainer(homePostEdit, homePageMain)
}

homePage.querySelector('.home__anchor--profile').onclick = function(event) {
    event.preventDefault()
    closeProfilePages()
    if (homePageProfile.classList.contains('off')) {
        homePageMain.classList.add('off')
        homePageProfile.classList.remove('off')
    } else {
        homePageMain.classList.remove('off')
        homePageProfile.classList.add('off')
    }
}

homePage.querySelector('.profile__anchor--home').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageMain, homePageProfile)
}

homePage.querySelector('.profile__anchor--password').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageProfile, homePagePassword)
}

homePage.querySelector('.profile__anchor--email').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageProfile, homePageEmail)
}

homePage.querySelector('.profile__anchor--username').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageProfile, homePageUsername)
}

homePage.querySelector('.profile__anchor--avatar').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageProfile, homePageAvatar)
}

homePage.querySelector('.navigation__anchor--logout').onclick = function(event) {
    event.preventDefault()
    
    closeProfilePages()
    homePage.classList.add('off')
    homePageProfile.classList.add('off')
    homePageMain.classList.remove('off')
    loginPage.classList.remove('off')

    context.userID = null
    homePageMain.querySelector('.home__post--feed').innerHTML = ''
}

homePage.querySelector('.password__anchor--profile').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePagePassword, homePageProfile)
    homePagePassword.querySelector('.password__form').reset()
}

homePage.querySelector('.email__anchor--profile').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageEmail, homePageProfile)
    homePageEmail.querySelector('.email__form').reset()
}

homePage.querySelector('.username__anchor--profile').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageUsername, homePageProfile)
    homePageUsername.querySelector('.username__form').reset()
}

homePage.querySelector('.avatar__anchor--profile').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageAvatar, homePageProfile)
    homePageAvatar.querySelector('.avatar__form').reset()
}

export function renderUser() {
    try {
        const user = getLoggedUser(context.userID)

        homePage.querySelector('.home__anchor--profile').innerText = user.name

        avatarImage.src = user.avatar? user.avatar : DEFAULT_AVATAR_URL

        return true
    }catch (error) {
        alert(error.message)

        return false
    }
}