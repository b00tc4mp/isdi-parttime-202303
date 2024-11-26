import { toggleOffClassInSection, deleteClassOnContainer, addClassOnContainer, bodyPage } from "../ui.js"
import { homePage } from "./home-page.js"
import { registerPage } from "./register-page.js"
import { loginPage } from "./login-page.js"
import { userAccount } from "./user-account.js"
import { logOut } from "../logic/logout.js"

export const menuHeader = document.querySelector('header .menu')

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
}


menuHeader.querySelector('.logout').onclick = function(event) {
    event.preventDefault()
    deleteClassOnContainer(bodyPage, 'logged-in')
    deleteClassOnContainer(loginPage, 'off')
    addClassOnContainer(registerPage, 'off')
    addClassOnContainer(homePage, 'off')
    logOut()
}