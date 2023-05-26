// import { homePage } from "../pages/home-page.js"
import { context, hideElement, showElement, resetPage } from "../ui.js"
import { updateUserAvatar } from '../logic/update-user-avatar.js'
import { changeEmail } from '../logic/update-user-email.js'
import { changePassword } from '../logic/update-user-password.js'
import { saveUsers } from '../data.js'

export default function initProfilePanel(homePage){
    const profileOptionsModal = homePage.querySelector('section[name=modal-profile-options]') //
    const changeEmailMenu = homePage.querySelector('section[name=modal-change-email]') //
    const changePasswordMenu = homePage.querySelector('section[name=modal-change-password]') //
    const closeProfileOptions = homePage.querySelector('.close-profile-options')
    
    const changeAvatarMenu = homePage.querySelector('section[name=modal-change-avatar]') //
    const changeAvatarButton = homePage.querySelector('.change-avatar')
    const changeAvatarForm = homePage.querySelector('.change-avatar-menu').querySelector('form')
    const avatarImg = homePage.querySelector('.horizontal-menu').querySelector('.user-avatar') //
    const DEFAULT_AVATAR_URL = 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg' //
    
    homePage.querySelector('.change-email').onclick = () => {
        hideElement(profileOptionsModal)
        showElement(changeEmailMenu)
    }
    
    changeEmailMenu.querySelector('form').onsubmit = (event) => {
        event.preventDefault()
        try {
            changeEmail(context.userId, homePage, changeEmailMenu)
            saveUsers()
        } catch(error){
            if(error.cause === 'ownError'){
                changeEmailMenu.querySelector('.red-text').textContent = error.message
            } else {
                console.log(error)
            }
        }
    }
    
    homePage.querySelector('.cancel-email-change').onclick = () => {
        hideElement(changeEmailMenu) //TODO: VER SI HAY QUE LIMPIAR
    }
    
    homePage.querySelector('.change-password').addEventListener('click', () => { 
        resetPage(changePasswordMenu)
        hideElement(profileOptionsModal)
        showElement(changePasswordMenu)
    })
    
    changePasswordMenu.querySelector('form').onsubmit = function(event) { 
        event.preventDefault();
        try {
            changePassword(context.userId, changePasswordMenu)
            saveUsers()
        } catch(error){
            if(error.cause === 'ownError'){
                changePasswordMenu.querySelector('.red-text').textContent = error.message
            } else {
                console.log(error)
            }
        }
    }
    
    homePage.querySelector('.cancel-password-change').onclick = () => {
        hideElement(changePasswordMenu)
    }
    
    changeAvatarButton.onclick = function() {
        showElement(changeAvatarMenu)
        hideElement(profileOptionsModal)
    }
    
    changeAvatarForm.onsubmit = function(event) {
        event.preventDefault()
        var avatarUrl = event.target.avatarurl.value
    
        try {
            updateUserAvatar(context.userId, avatarUrl, avatarImg)
            changeAvatarForm.reset()
            saveUsers()
        } catch(error){
            if(error.cause === 'ownError'){
                alert(error.message)
                // changePasswordMenu.querySelector('.red-text').textContent = error.message -> TODO: ACOMODAR!!!!
            } else {
                console.log(error)
            }
        }
    }
    
    homePage.querySelector('.cancel-avatar-change').onclick = () => {
        hideElement(changeAvatarMenu)
    }
    
    closeProfileOptions.onclick = function() {
        hideElement(profileOptionsModal) // TODO: VER SI HAY QUE LIMPIAR
    }

    return { profileOptionsModal, changeEmailMenu, changePasswordMenu, changeAvatarMenu, avatarImg, DEFAULT_AVATAR_URL }
}