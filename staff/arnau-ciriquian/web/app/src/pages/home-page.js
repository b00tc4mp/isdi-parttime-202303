import { loginPage } from "./login-page.js"
import { updateUsername } from "../logic/update-user-name.js"
import { closeProfilePages, context, showHideContainer, unshadowPredefinedAvatars } from "../ui.js"
import { updateUserPassword } from "../logic/update-user-password.js"
import { updateUserEmail } from "../logic/update-user-email.js"
import { updateUserAvatar } from "../logic/update-user-avatar.js"
import { createNewPost } from "../logic/create-new-post.js"
import alienImage from "../../images/alien.svg"
import spaceDogImage from "../../images/space-dog.svg"
import galaxyImage from "../../images/galaxy.svg"
import meteoriteImage from "../../images/meteorite.svg"

export const DEFAULT_AVATAR_URL = spaceDogImage

export const homePage = document.querySelector('.home')
export const avatarImage = homePage.querySelector('.avatar')
const homePageAddPost = homePage.querySelector('.home__anchor--new-post')
const homePagePost = homePage.querySelector('.home__post')
export const homePageProfile = homePage.querySelector('.home__profile')
export const homePagePassword = homePage.querySelector('.home__password')
export const homePageUsername = homePage.querySelector('.home__username')
export const homePageEmail = homePage.querySelector('.home__email')
export const homePageAvatar = homePage.querySelector('.home__avatar')
export const homePageMain = homePage.querySelector('.home__main')
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
        alert ('Posted!')

        homePagePost.querySelector('.post__form').reset()
        showHideContainer(homePagePost, homePageMain)
    } catch (error) {
        alert(error.message)
    }
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

homePage.querySelector('.password__form').onsubmit = function(event) {
    event.preventDefault()

    const oldPassword = event.target.oldPassword.value
    const newPassword = event.target.newPassword.value
    const confirmedPassword = event.target.newPasswordConfirmation.value

    try {
        updateUserPassword(context.userID, oldPassword, newPassword, confirmedPassword)
        alert('password updated')

        showHideContainer(homePageProfile, homePagePassword)
        homePage.querySelector('.password__form').reset()
    } catch (error) {
        alert(error.message)
    } 
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