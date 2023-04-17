import { toggleOffClassInSection, deleteClassOnContainer, addClassOnContainer, bodyPage } from "../ui.js"
import { homePage } from "./home-page.js"
import { registerPage } from "./register-page.js"
import { loginPage } from "./login-page.js"
import { userAccount } from "./user-account.js"
import { logOut } from "../logic/logout.js"
import { createPostForm } from "../logic/create-post.js"
import { editPostForm } from "../logic/edit-post.js"

export const menuHeader = document.querySelector('header .menu')
export const header = document.querySelector('header')

menuHeader.querySelector('.submenu-element.login').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(registerPage, loginPage)
}
// header.querySelector('.toggle-menu').onclick = function(event) {
//     event.preventDefault()
//     header.querySelector('.menu').classList.add('open')
// }
// header.querySelector('.close-menu').onclick = function(event) {
//     event.preventDefault()
//     header.querySelector('.menu').classList.remove('open')
// }

menuHeader.querySelector('.submenu-element.register').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(registerPage, loginPage)
}

menuHeader.querySelector('.user-account').onclick = function(event) {
    event.preventDefault()
    toggleOffClassInSection(homePage, userAccount)
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