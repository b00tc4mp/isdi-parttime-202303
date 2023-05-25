import { toggleOffClassInSection, deleteClassOnContainer, addClassOnContainer, bodyPage } from "../ui.mjs"
import { homePage } from "./home-page.mjs"
import { registerPage } from "./register-page.mjs"
import { loginPage } from "./login-page.mjs"
import { userAccount } from "./user-account.mjs"
import { logOut } from "../logic/logout.mjs"

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