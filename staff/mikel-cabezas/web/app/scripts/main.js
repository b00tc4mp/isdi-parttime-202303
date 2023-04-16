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
import { getTheme } from './logic/get-theme.js'

getTheme()

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

