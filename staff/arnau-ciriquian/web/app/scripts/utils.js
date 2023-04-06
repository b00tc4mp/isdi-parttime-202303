import { actualPasswordEyeToggle } from "./logic.js"
import { loginPage, registerPage, homePageEmail, homePageUsername, homePagePassword } from "./main.js"

const loginEye = loginPage.querySelector('.login-eye')
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
