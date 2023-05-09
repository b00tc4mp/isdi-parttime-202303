import { updateUserAvatar } from "../logic/update-user-avatar"
import { showHideContainer, context, unshadowPredefinedAvatars } from "../ui"
import { homePageProfile, avatarImage } from "../pages/home-page"
import alienImage from "../../images/alien.svg"
import spaceDogImage from "../../images/space-dog.svg"
import galaxyImage from "../../images/galaxy.svg"
import meteoriteImage from "../../images/meteorite.svg"

export const spaceDog = document.querySelector('.space-dog')
export const alien = document.querySelector('.alien')
export const meteorite = document.querySelector('.meteorite')
export const galaxy = document.querySelector('.galaxy')
let newAvatar = ''

export default function initUpdateAvatar(homePage) {
    const homePageAvatar = homePage.querySelector('.home__avatar')

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

    return homePageAvatar
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