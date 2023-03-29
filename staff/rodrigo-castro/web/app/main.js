//presentation
var userLogged

var registerPage = document.querySelector('.register-page')

var homePage = document.querySelector('.home-page')
var homeBar = document.querySelector('.home-bar')
var profileOptions = homePage.querySelector('.profile-options')
var avatarMenu = homePage.querySelector('.change-avatar-menu')
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
        checkNewUser(userEmail)

        validateName(userName)

        validateEmail(userEmail, emailExpression)

        validatePassword(userPassword)

        registerNewUser(users, userName.trim(), userEmail, userPassword)

        resetRegisterPage(registerPage)

        loginPage.classList.remove('off')
    } catch(error){
        registerPage.querySelector('.red-text').textContent = error.message
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
        
        resetLoginPage(loginPage)
        
        userLogged = JSON.parse(JSON.stringify(foundUser))  // userLogged = Object.assign({}, foundUser) -> otra forma de copiar objetos
    } catch(error){
        loginPageRedText.textContent = error.message
    }
})

homeBar.querySelector('.menu-buttons[name=my-profile]').addEventListener('click', () => {
    homePage.querySelector('.profile-options').classList.remove('off')
    homePage.querySelector('.change-password-menu').classList.add('off')
})

homePage.querySelector('.change-password').addEventListener('click', () => {
    homePage.querySelector('.change-password-menu').querySelector('.red-text').classList.remove('green-text')
    homePage.querySelector('.change-password-menu').querySelector('.red-text').textContent = ''
    homePage.querySelector('.profile-options').classList.add('off')
    homePage.querySelector('.change-password-menu').classList.remove('off')
})

homePage.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    try {
        changePassword(userLogged, users)
    } catch(error){
        homePage.querySelector('.red-text').textContent = error.message
    }
    homePage.querySelector('form').reset()
    
})

changeAvatarButton.onclick = function() {
    avatarMenu.classList.remove('off')
    profileOptions.classList.add('off')
}

changeAvatarForm.onsubmit = function(event) {
    event.preventDefault()
    var avatarUrl = event.target.avatarurl.value

    try {
        updateUserAvatar(userLogged, avatarUrl)
    } catch(error){
        console.log(error.message)
        alert(error.message)
    }
}

homeBar.querySelector('[name=logout]').addEventListener('click', () => {
    homePage.classList.add('off')
    homePage.querySelector('.change-password-menu').classList.add('off')
    homePage.querySelector('.profile-options').classList.add('off')
    loginPage.classList.remove('off')
    avatarImg.src = defaultAvatar
    userLogged = undefined
})

document.querySelector(".go-to-sign-in").addEventListener('click', (event) => {
    event.preventDefault();
    registerPage.classList.add("off");
    loginPage.classList.remove("off")
})

document.querySelector(".register-now-button").addEventListener("click", (event) => {
    event.preventDefault();
    loginPage.classList.add("off");
    registerPage.classList.remove("off");
})