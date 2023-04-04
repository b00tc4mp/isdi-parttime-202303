//presentation
var userLogged
var redText = document.querySelector('.red-text')

var registerPage = document.querySelector('.register-page')

var homePage = document.querySelector('.home-page')
var homeBar = document.querySelector('.home-bar')
var homePageRedText = homePage.querySelector('.red-text')
var myProfileButton = homeBar.querySelector('.menu-buttons[name=my-profile]')

var profileOptions = homePage.querySelector('.profile-options')

var changeEmailMenu = homePage.querySelector('.change-email-menu')
var emailMenuRedText = changeEmailMenu.querySelector('.red-text')

var changePasswordMenu = homePage.querySelector('.change-password-menu')

var changeAvatarMenu = homePage.querySelector('.change-avatar-menu')
var changeAvatarButton = homePage.querySelector('.change-avatar')
var changeAvatarForm = homePage.querySelector('.change-avatar-menu').querySelector('form')
var avatarImg = homePage.querySelector('.horizontal-menu').querySelector('.user-avatar')
var defaultAvatar = 'https://avatarfiles.alphacoders.com/157/thumb-157567.jpg'

var loginPage = document.querySelector('.login-page')
var loginPageRedText = loginPage.querySelector('.red-text')

registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var userName = registerPage.querySelector('.input-field[name=name]').value
    var userEmail = registerPage.querySelector('.input-field[name=email]').value
    var userPassword = registerPage.querySelector('.input-field[name=password]').value

    try {
        
        registerUserFull(userEmail, userName, emailExpression, userPassword, users)
        resetPage(registerPage)
        showElement(loginPage)

    } catch(error){
        redText.textContent = error.message
    }

})

loginPage.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    var userEmail = loginPage.querySelector('.input-field[name=email]').value.toLowerCase()
    var userPassword = loginPage.querySelector('.input-field[name=password]').value

    var foundUser = findUser(users, userEmail)

    try {
        logIn(foundUser, userPassword, homePage, avatarImg)
        resetPage(loginPage)
    } catch(error){
        loginPageRedText.textContent = error.message
    }
})

myProfileButton.addEventListener('click', () => {
    toggleElement(profileOptions)
    hideElement(changePasswordMenu, changeAvatarMenu, changeEmailMenu)
    resetPage(changeAvatarMenu)
})

homePage.querySelector('.change-email').onclick = () => {
    hideElement(profileOptions)
    showElement(changeEmailMenu)
}

changeEmailMenu.querySelector('form').onsubmit = (event) => {
    event.preventDefault()
    try {
        changeEmail(userLogged, users, event)
    } catch(error){
        emailMenuRedText.textContent = error.message
        console.log(error)
    }
}

homePage.querySelector('.change-password').addEventListener('click', () => { // REFACTORIZAR PA Q QUEDE MAS LINDO
    homePageRedText.classList.remove('green-text')
    homePageRedText.textContent = ''
    hideElement(profileOptions)
    showElement(changePasswordMenu)
})

changePasswordMenu.querySelector('form').addEventListener('submit', (event) => { 
    event.preventDefault();
    try {
        changePassword(userLogged, users, redText)
    } catch(error){
        homePageRedText.textContent = error.message
    }
    homePage.querySelector('form').reset()
})

changeAvatarButton.onclick = function() {
    showElement(changeAvatarMenu)
    hideElement(profileOptions)
}

changeAvatarForm.onsubmit = function(event) {
    event.preventDefault()
    var avatarUrl = event.target.avatarurl.value

    try {
        updateUserAvatar(userLogged, avatarUrl, avatarImg)
        changeAvatarForm.reset()
    } catch(error){
        console.log(error.message)
        alert(error.message)
    }
}

homeBar.querySelector('[name=logout]').addEventListener('click', () => {
    hideElement(homePage, changeAvatarMenu, changePasswordMenu, profileOptions)
    showElement(loginPage)
    avatarImg.src = defaultAvatar
    userLogged = undefined
})

document.querySelector(".go-to-sign-in").addEventListener('click', (event) => {
    event.preventDefault()
    hideElement(registerPage)
    resetPage(loginPage)
    showElement(loginPage)
})

document.querySelector(".register-now-button").addEventListener("click", (event) => {
    event.preventDefault()
    hideElement(loginPage)
    resetPage(registerPage)
    showElement(registerPage)
})