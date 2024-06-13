import { loginPage } from "./login-page"
import { updateUsername } from "../logic/update-user-name"
import { closeProfilePages, context, showHideContainer, unshadowPredefinedAvatars } from "../ui"
import initUpdatePassword from "../components/update-password"

import { updateUserEmail } from "../logic/update-user-email"
import { updateUserAvatar } from "../logic/update-user-avatar"
import { createNewPost } from "../logic/create-new-post"
import alienImage from "../../images/alien.svg"
import spaceDogImage from "../../images/space-dog.svg"
import galaxyImage from "../../images/galaxy.svg"
import meteoriteImage from "../../images/meteorite.svg"
import { getLoggedUser } from "../logic/login-user"
import retrievePosts from "../logic/retrive-posts"
import { updatePost } from "../logic/update-post"

export const DEFAULT_AVATAR_URL = spaceDogImage

export const homePage = document.querySelector('.home')
export const avatarImage = homePage.querySelector('.avatar')
const homePageAddPost = homePage.querySelector('.home__anchor--new-post')
export const homePagePost = homePage.querySelector('.home__post')
export const homePageProfile = homePage.querySelector('.home__profile')
//export const homePagePassword = homePage.querySelector('.home__password')
export const homePageUsername = homePage.querySelector('.home__username')
export const homePageEmail = homePage.querySelector('.home__email')
export const homePageAvatar = homePage.querySelector('.home__avatar')
export const homePageMain = homePage.querySelector('.home__main')
export const homePostEdit = homePage.querySelector('.home__post--edit')

//const updatePasswordPanel = initUpdatePassword(homePage)
export const homePagePassword = initUpdatePassword(homePage)


export const spaceDog = homePage.querySelector('.space-dog')
export const alien = homePage.querySelector('.alien')
export const meteorite = homePage.querySelector('.meteorite')
export const galaxy = homePage.querySelector('.galaxy')
let newAvatar = ''

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

homePage.querySelector('.avatar__form').onsubmit = function(event) {
    event.preventDefault()

    if (!newAvatar) {
        newAvatar = event.target.newAvatar.value
    }

    try {
        updateUserAvatar(context.userID, newAvatar)
        alert('avatar updated')

        avatarImage.src = newAvatar
        showHideContainer(homePageProfile, homePageAvatar)
        homePage.querySelector('.avatar__form').reset()
        newAvatar = ''
        unshadowPredefinedAvatars()
    } catch (error) {
        alert(error.message)
    }
}

spaceDog.onclick = function() {
    unshadowPredefinedAvatars()
    spaceDog.classList.add('pre-avatar-shadow')

    newAvatar = spaceDogImage
}

alien.onclick = function(event) {
    unshadowPredefinedAvatars()
    alien.classList.add('pre-avatar-shadow')

    newAvatar = alienImage
}

meteorite.onclick = function(event) {
    unshadowPredefinedAvatars()
    meteorite.classList.add('pre-avatar-shadow')

    newAvatar = meteoriteImage
}

galaxy.onclick = function(event) {
    unshadowPredefinedAvatars()
    galaxy.classList.add('pre-avatar-shadow')

    newAvatar = galaxyImage
}

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

homePage.querySelector('.username__form').onsubmit = function(event) {
    event.preventDefault()

    const oldUsername = event.target.oldUsername.value
    const newUsername = event.target.newUsername.value
    const password = event.target.password.value

    try {
        updateUsername(context.userID, oldUsername, newUsername, password)
        alert('name updated')
        homePage.querySelector('.home__anchor--profile').innerText = newUsername

        showHideContainer(homePageProfile, homePageUsername)
        homePage.querySelector('.username__form').reset()
    } catch (error) {
        alert(error.message)
    }
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