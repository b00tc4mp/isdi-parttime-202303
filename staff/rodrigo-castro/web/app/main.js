//presentation

var registerPage = document.querySelector('.register-page')
var loginPage = document.querySelector('.login-page')
var homePage = document.querySelector('.home-page')
var homeBar = document.querySelector('.home-bar')

registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var userName = registerPage.querySelector('.input-field[name=name]').value
    var userEmail = registerPage.querySelector('.input-field[name=email]').value
    var userPassword = registerPage.querySelector('.input-field[name=password]').value

    const isEmailRegistered = checkNewUser(userEmail)

    if (isEmailRegistered) {
        registerPage.querySelector('.red-text').textContent = 'Email already registered'
        registerPage.querySelector('.input-field[name=email]').value = ''
    } else if (userPassword.length < 8) {
        registerPage.querySelector('.red-text').textContent = 'Password must have at least 8 characters'
    } else {
        registerNewUser(users, userName, userEmail, userPassword)
        registerPage.querySelector('.red-text').textContent = ''
        registerPage.querySelector('form').reset()
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    }

})

loginPage.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    var userEmail = loginPage.querySelector('.input-field[name=email]').value
    var userPassword = loginPage.querySelector('.input-field[name=password]').value

    var foundUser = findUser(users, userEmail)

    if (foundUser !== undefined && foundUser.password === userPassword) {
        loginPage.classList.add('off')
        homePage.classList.remove('off')
        homeBar.classList.remove('off')
        homePage.querySelector('.welcome-message').textContent =`¡Hi ${foundUser.name}!`
        loginPage.querySelector('.red-text').textContent = ''
        loginPage.querySelector('form').reset()
        userLogged = foundUser
    } else {
        loginPage.querySelector('.red-text').textContent = 'Wrong email or password'
    }
})

homeBar.querySelector('.menu-buttons[name=my-profile]').addEventListener('click', (event) => {
    homePage.querySelector('.profile-options').classList.remove('off')
    homePage.querySelector('.change-password-menu').classList.add('off')
})

homePage.querySelector('.profile-options .change-password').addEventListener('click', (event) => {
    homePage.querySelector('.change-password-menu').querySelector('.red-text').classList.remove('green-text')
    homePage.querySelector('.change-password-menu').querySelector('.red-text').textContent = ''
    homePage.querySelector('.profile-options').classList.add('off')
    homePage.querySelector('.change-password-menu').classList.remove('off')
    console.log(userLogged)
})

homePage.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    changePassword(userLogged, users)
    console.log(userLogged)
    homePage.querySelector('form').reset()
})

homeBar.querySelector('[name=logout]').addEventListener('click', () => {
    homeBar.classList.add('off')
    homePage.classList.add('off')
    homePage.querySelector('.change-password-menu').classList.add('off')
    homePage.querySelector('.profile-options').classList.add('off')
    loginPage.classList.remove('off')
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