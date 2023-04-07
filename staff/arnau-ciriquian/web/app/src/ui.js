import { loginPage } from "./pages/login-page.js"
import { registerPage } from "./pages/register-page.js"
import { homePageAvatar, homePageEmail, homePagePassword, homePageUsername } from "./pages/home-page.js"

const logPage = document.querySelector('.login')

const loginEye = logPage.querySelector('.login-eye')
const registerNewEye = registerPage.querySelector('.register-eye')
const registerConfirmEye = registerPage.querySelector('.register-confirm-eye')
const usernameEye = homePageUsername.querySelector('.username-eye')
const emailEye = homePageEmail.querySelector('.email-eye')
const oldEye = homePagePassword.querySelector('.old-eye')
const newEye = homePagePassword.querySelector('.new-eye')
const newConfirmEye = homePagePassword.querySelector('.new-confirm-eye')

loginEye.onclick = function(event){
    event.target.classList.toggle('fa-eye-slash')
    actualPasswordEyeToggle(loginPage, '.login__password')
}

registerNewEye.onclick = function(event){
    event.target.classList.toggle('fa-eye-slash')
    actualPasswordEyeToggle(registerPage, '.register__password')
}

registerConfirmEye.onclick = function(event){
    event.target.classList.toggle('fa-eye-slash')
    actualPasswordEyeToggle(registerPage, '.register__password--confirm')
}

usernameEye.onclick = function(event){
    event.target.classList.toggle('fa-eye-slash')
    actualPasswordEyeToggle(homePageUsername, '.username__password')
}

emailEye.onclick = function(event){
    event.target.classList.toggle('fa-eye-slash')
    actualPasswordEyeToggle(homePageEmail, '.email__password')
}

oldEye.onclick = function(event){
    event.target.classList.toggle('fa-eye-slash')
    actualPasswordEyeToggle(homePagePassword, '.old__password')
}

newEye.onclick = function(event){
    event.target.classList.toggle('fa-eye-slash')
    actualPasswordEyeToggle(homePagePassword, '.new__password')
}

newConfirmEye.onclick = function(event){
    event.target.classList.toggle('fa-eye-slash')
    actualPasswordEyeToggle(homePagePassword, '.new__password--confirm')
}

export function showHideContainer(...containers) {
    containers.forEach(container => container.classList.toggle('off'))
}

export const context = {
    userID: null
}

export function closeProfilePages() {
    homePageAvatar.classList.add('off')
    homePageUsername.classList.add('off')
    homePageEmail.classList.add('off')
    homePagePassword.classList.add('off')
}

function actualPasswordEyeToggle(container, passwordClass) {
    const password = container.querySelector(passwordClass)

    if (password.type === 'password') {
        password.type = 'text'
    } else {
        password.type = 'password'
    }
}