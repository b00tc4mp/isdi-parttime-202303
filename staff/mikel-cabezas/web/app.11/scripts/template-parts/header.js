import { toggleOffClassInSection, deleteClassOnContainer, addClassOnContainer, bodyPage } from "../ui.js"
import { homePage } from "../pages/home-page.js"
import { registerPage } from "../pages/register-page.js"
import { loginPage } from "../pages/login-page.js"
import { userAccount } from "../pages/user-account.js"
import { logOut } from "../logic/logout.js"
import { createPostForm } from "../logic/create-post.js"
import { editPostForm } from "../logic/edit-post.js"
import { pushUserDataToHeader } from "../logic/push-user-to-header.js"
import { pushUserDataInForm } from "../logic/push-user-data-in-form.js"
import { context } from "../ui.js"

export const menuHeader = document.querySelector('header .menu')
export const header = document.querySelector('header')
const userId = context.userId

menuHeader.querySelector('.submenu-element.login').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(registerPage, loginPage)
}
menuHeader.querySelector('.submenu-element.register').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(registerPage, loginPage)
}
menuHeader.querySelector('.user-account').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(homePage, userAccount)
    pushUserDataToHeader(userId)
    pushUserDataInForm(userId)
}
menuHeader.querySelector('.logout').onclick = function(event) {
    event.preventDefault()
    deleteClassOnContainer(bodyPage, 'logged-in')
    deleteClassOnContainer(loginPage, 'off')
    addClassOnContainer(registerPage, 'off')
    addClassOnContainer(homePage, 'off')
    logOut()
}
menuHeader.querySelector('.homepage').onclick = function(event) {
    event.preventDefault()
    if(document.querySelector('body').classList.contains('logged-in')) {
        deleteClassOnContainer(homePage, 'off')
        addClassOnContainer(loginPage, 'off')
        addClassOnContainer(registerPage, 'off')
        addClassOnContainer(userAccount, 'off')
        addClassOnContainer(editPostForm, 'off')
        addClassOnContainer(createPostForm, 'off')
    }
}
header.querySelector('.logo').onclick = function(event) {
    event.preventDefault()
    if(document.querySelector('body').classList.contains('logged-in')) {
        deleteClassOnContainer(homePage, 'off')
        addClassOnContainer(loginPage, 'off')
        addClassOnContainer(registerPage, 'off')
        addClassOnContainer(userAccount, 'off')
        addClassOnContainer(editPostForm, 'off')
        addClassOnContainer(createPostForm, 'off')
    }
}