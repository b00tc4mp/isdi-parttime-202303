// import { loginPage } from "../pages/login-page.js"
// import { registerPage } from "../pages/register-page.js"
// import { homePageEmail, homePagePassword, homePageUsername } from "../pages/home-page.js"

// const logPage = document.querySelector('.login')
// const regPage = document.querySelector('.register')

// const loginEye = logPage.querySelector('.login-eye')
// const registerNewEye = regPage.querySelector('.register-eye')
// const registerConfirmEye = regPage.querySelector('.register-confirm-eye')
// const usernameEye = homePageUsername.querySelector('.username-eye')
// const emailEye = homePageEmail.querySelector('.email-eye')
// const oldEye = homePagePassword.querySelector('.old-eye')
// const newEye = homePagePassword.querySelector('.new-eye')
// const newConfirmEye = homePagePassword.querySelector('.new-confirm-eye')

// loginEye.onclick = function(event){
//     event.target.classList.toggle('fa-eye-slash')
//     actualPasswordEyeToggle(loginPage, '.login__password')
// }

// registerNewEye.onclick = function(event){
//     event.target.classList.toggle('fa-eye-slash')
//     actualPasswordEyeToggle(registerPage, '.register__password')
// }

// registerConfirmEye.onclick = function(event){
//     event.target.classList.toggle('fa-eye-slash')
//     actualPasswordEyeToggle(registerPage, '.register__password--confirm')
// }

// usernameEye.onclick = function(event){
//     event.target.classList.toggle('fa-eye-slash')
//     actualPasswordEyeToggle(homePageUsername, '.username__password')
// }

// emailEye.onclick = function(event){
//     event.target.classList.toggle('fa-eye-slash')
//     actualPasswordEyeToggle(homePageEmail, '.email__password')
// }

// oldEye.onclick = function(event){
//     event.target.classList.toggle('fa-eye-slash')
//     actualPasswordEyeToggle(homePagePassword, '.old__password')
// }

// newEye.onclick = function(event){
//     event.target.classList.toggle('fa-eye-slash')
//     actualPasswordEyeToggle(homePagePassword, '.new__password')
// }

// newConfirmEye.onclick = function(event){
//     event.target.classList.toggle('fa-eye-slash')
//     actualPasswordEyeToggle(homePagePassword, '.new__password--confirm')
// }

// function actualPasswordEyeToggle(container, passwordClass) {
//     const password = container.querySelector(passwordClass)

//     if (password.type === 'password') {
//         password.type = 'text'
//     } else {
//         password.type = 'password'
//     }
// }

// export function hideAllPasswords(container, ...passwordsClasses) {
//     passwordsClasses.forEach(passwordClass => {
//         const passwordToHide = container.querySelector(passwordClass)
//         passwordToHide.type = 'password'
//     })
// }

// export function unslashAllEyes(container, ...eyesClasses) {
//     eyesClasses.forEach(eyeClass => {
//         const eyeToUnslash = container.querySelector(eyeClass)
//         eyeToUnslash.classList.remove('fa-eye-slash')
//     })
// }