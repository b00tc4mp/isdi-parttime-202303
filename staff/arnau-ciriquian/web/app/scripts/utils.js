var loginEye = loginPage.querySelector('.login-eye')
var registerNewEye = registerPage.querySelector('.register-eye')
var registerConfirmEye = registerPage.querySelector('.register-confirm-eye')
var usernameEye = homePageUsername.querySelector('.username-eye')
var emailEye = homePageEmail.querySelector('.email-eye')
var oldEye = homePagePassword.querySelector('.old-eye')
var newEye = homePagePassword.querySelector('.new-eye')
var newConfirmEye = homePagePassword.querySelector('.new-confirm-eye')

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

function showHideContainer(...containers) {
    containers.forEach(container => container.classList.toggle('off'))
}
