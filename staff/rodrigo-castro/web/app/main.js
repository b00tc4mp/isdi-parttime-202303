//presentation
var userLogged
var redText = document.querySelector('.red-text')

var registerPage = document.querySelector('.register-page')

var homePage = document.querySelector('.home-page')
var homeBar = document.querySelector('.home-bar')
var homePageRedText = homePage.querySelector('.red-text')
var myProfileButton = homeBar.querySelector('.menu-buttons[name=my-profile]')
var profileOptions = homePage.querySelector('.profile-options')
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
        if(foundUser === undefined || foundUser.password !== userPassword) throw new Error('Wrong email or password')

        goToHomePage(homePage, foundUser, avatarImg)        
        
        resetPage(loginPage)
        
        userLogged = JSON.parse(JSON.stringify(foundUser))
        delete userLogged.password
        // userLogged = Object.assign({}, foundUser) -> otra forma de copiar objetos
    } catch(error){
        loginPageRedText.textContent = error.message
    }
})

myProfileButton.addEventListener('click', () => {
    toggleElement(profileOptions)
    hideElement(changePasswordMenu, changeAvatarMenu)
    resetPage(changeAvatarMenu)
})

homePage.querySelector('.change-password').addEventListener('click', () => { // REFACTORIZAR PA Q QUEDE MAS LINDO
    changePasswordMenu.querySelector('.red-text').classList.remove('green-text')
    changePasswordMenu.querySelector('.red-text').textContent = ''
    homePage.querySelector('.profile-options').classList.add('off')
    changePasswordMenu.classList.remove('off')
})

homePage.querySelector('form').addEventListener('submit', (event) => { 
    event.preventDefault();
    try {
        changePassword(userLogged, users, homePageRedText)
    } catch(error){
        homePage.querySelector('.red-text').textContent = error.message
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