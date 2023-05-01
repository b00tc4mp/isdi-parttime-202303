//import { homePageAvatar, homePageEmail, homePagePassword, homePageUsername, homePagePost } from "./pages/home-page.js"
//import { alien, spaceDog, meteorite, galaxy } from "./components/update-avatar.js"

export function showHideContainer(...containers) {
    containers.forEach(container => container.classList.toggle('off'))
}

export function showContainer(...containers) {
    containers.forEach(container => container.classList.remove('off'))
}

export function hideContainer(...containers) {
    containers.forEach(container => container.classList.add('off'))
}

export const context = sessionStorage

// export function closeProfilePages() {
//     homePageAvatar.classList.add('off')
//     homePageUsername.classList.add('off')
//     homePageEmail.classList.add('off')
//     homePagePassword.classList.add('off')
//     homePagePost.classList.add('off')
// }

// export function unshadowPredefinedAvatars() {
//     alien.classList.remove('pre-avatar-shadow')
//     spaceDog.classList.remove('pre-avatar-shadow')
//     meteorite.classList.remove('pre-avatar-shadow')
//     galaxy.classList.remove('pre-avatar-shadow')
// }