// import {users} from './data.mjs'
// import {validateName, validateEmail, validatePassword, validateNewPassword} from './validators.mjs'
// import {file, img, avatarHeader, printImage} from './localImagesBase64.mjs'
// import {registerUser, getCurrentUser, pushUserDataInForm, updateUserName, updateUserEmail, updateUserPassword, updateUserImage, logOut} from './logic.mjs'
// import {deleteClassOnContainer, addClassOnContainer, changeMessageOnContainer, clearMessageContainer, toggleOffClassInSection, showHidePassword} from './ui.mjs'
import {loginPage } from './pages/login-page.js'
import { homePage, renderUser } from './pages/home-page.js'
import { context, deleteClassOnContainer, addClassOnContainer, bodyPage } from './ui.js'
import { pushUserDataToHeader } from './logic/push-user-to-header.js'
import { pushUserDataInForm } from './logic/push-user-data-in-form.js'
import { userAccount } from './pages/user-account.js'

// if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     localStorage.theme = 'dark'
//     document.querySelector('html').classList.add('dark')
// } else {
//     localStorage.theme = 'light'
//     document.querySelector('html').classList.add('light')
// }

if(localStorage.theme === 'light') {
    // alert('light')
    document.documentElement.setAttribute("data-theme", "light");
    userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_off'
    userAccount.querySelector('.user-theme .material-symbols-outlined').classList.remove ('on')
    userAccount.querySelector('.user-theme').classList.remove ('dark')
    userAccount.querySelector('.user-theme').classList.add ('light')
}
if(localStorage.theme === 'dark') {
    // alert('dark')
    document.documentElement.setAttribute("data-theme", "dark");
    userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_on'
    userAccount.querySelector('.user-theme .material-symbols-outlined').classList.add ('on')
    userAccount.querySelector('.user-theme').classList.remove ('light')
    userAccount.querySelector('.user-theme').classList.add ('dark')
    
}


userAccount.querySelector('.user-theme').onclick = (event) => {
    event.preventDefault
    
    if(userAccount.querySelector('.user-theme').classList.contains('light')) {
        localStorage.theme = 'dark'
        document.documentElement.setAttribute("data-theme", "dark");
        userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_on'
        userAccount.querySelector('.user-theme .material-symbols-outlined').classList.add ('on')
        userAccount.querySelector('.user-theme').classList.add('dark')
        return userAccount.querySelector('.user-theme').classList.remove('light')
    }
    if(userAccount.querySelector('.user-theme').classList.contains('dark')) {
        localStorage.theme = 'light'
        document.documentElement.setAttribute("data-theme", "light");
        userAccount.querySelector('.user-theme .material-symbols-outlined').innerText = 'toggle_off'
        userAccount.querySelector('.user-theme .material-symbols-outlined').classList.remove ('on')
        userAccount.querySelector('.user-theme').classList.remove('dark')
        return userAccount.querySelector('.user-theme').classList.add('light')
    }

}





if( !renderUser() ) {
    deleteClassOnContainer(loginPage, ('off'))
    addClassOnContainer(homePage, 'off')
} else {
    const userId = context.userId
    deleteClassOnContainer(homePage, ('off'))
    addClassOnContainer(loginPage, 'off')
    pushUserDataInForm(userId)
bodyPage.classList.add('logged-in')
    pushUserDataToHeader(userId)
    renderUser()
}

// export let currentUserID 





// document.querySelector('.password > i').onclick = function() {
//     if(this.classList.contains('uil-eye')) {
//         this.classList.add('uil-eye-slash')
//         this.classList.remove('uil-eye')
//         this.parentElement.querySelector('.password > input').removeAttribute('type', 'password')
//         return
//     }
//     if(this.classList.contains('uil-eye-slash')) {
//         document.querySelector('.password > i').classList.add('uil-eye')
//         document.querySelector('.password > i').classList.remove('uil-eye-slash')
//         document.querySelector('.password > i').parentElement.querySelector('.password > input').setAttribute('type', 'password')
//         return
//     }
// }




