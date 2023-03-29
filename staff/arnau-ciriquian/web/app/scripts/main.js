var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')
var homePageProfile = homePage.querySelector('.home__profile')
var homePagePassword = homePage.querySelector('.home__password')
var homePageEmail = homePage.querySelector('.home__email')
var homePageMain = homePage.querySelector('.home__main')
var authenticatedEmail
var loggedUserName

registerPage.querySelector('form').onsubmit = function(event) {
    event.preventDefault()

    var newUser = registerPage.querySelector('input[name=name]').value
    var newEmail = registerPage.querySelector('input[name=email]').value
    var newPassword = registerPage.querySelector('input[name=password]').value
    var confirmedPassword = registerPage.querySelector('input[name=password-confirmation]').value

    try {
        addNewUser(newUser, newEmail, newPassword, confirmedPassword)

        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    } catch (error) {
        alert(error.message)
    }
}

loginPage.querySelector('form').onsubmit = function(event) {
    event.preventDefault()

    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value

    try {
        authenticateUser(email, password)

        authenticatedEmail = email

        var foundUser = getLoggedUser(email)

        
        loginPage.classList.add('off')
        homePage.classList.remove('off')
        homePageMain.classList.remove('off')
        homePage.querySelector('.home__anchor--profile').innerText = foundUser.name
    } catch (error) {
        alert(error.message)
    }
}

homePage.querySelector('.password__form').onsubmit = function(event) {
    event.preventDefault()

    var oldPassword = homePage.querySelector('input[name=old-password]').value
    var newPassword = homePage.querySelector('input[name=new-password]').value
    var confirmedPassword = homePage.querySelector('input[name=new-password-confirmation]').value
    var email = authenticatedEmail

    try {
        updateUserPassword(email, oldPassword, newPassword, confirmedPassword)

        homePageProfile.classList.remove('off')
        homePagePassword.classList.add('off')
    } catch (error) {
        alert(error.message)
    } 
}

homePage.querySelector('.email__form').onsubmit = function(event) {
    event.preventDefault()

    var oldEmail = homePage.querySelector('input[name=old-email').value
    var newEmail = homePage.querySelector('input[name=new-email').value
    var confirmedEmail = homePage.querySelector('input[name=new-email-confirmation').value

    try {
        updateUserEmail(oldEmail, newEmail, confirmedEmail)

        homePageProfile.classList.remove('off')
        homePageEmail.classList.add('off')
    } catch (error) {
        alert(error.message)
    }
}

registerPage.querySelector('.register__anchor--login').onclick = function(event) {
    event.preventDefault()
    
    registerPage.classList.add('off')
    loginPage.classList.remove('off')
}

loginPage.querySelector('.login__anchor--register').onclick = function(event) {
    event.preventDefault()
    
    loginPage.classList.add('off')
    registerPage.classList.remove('off')
}

homePage.querySelector('.home__anchor--profile').onclick = function(event) {
    event.preventDefault()

    if (homePageProfile.classList.contains('off')) {
        homePageMain.classList.add('off')
        homePageProfile.classList.remove('off')
    } else {
        homePageMain.classList.remove('off')
        homePageProfile.classList.add('off')
    }
}

homePage.querySelector('.profile__anchor--home').onclick = function(event) {
    event.preventDefault()
    
    homePageMain.classList.remove('off')
    homePageProfile.classList.add('off')
}

homePage.querySelector('.profile__anchor--password').onclick = function(event) {
    event.preventDefault()

    homePageProfile.classList.add('off')
    homePagePassword.classList.remove('off')
}

homePage.querySelector('.profile__anchor--email').onclick = function(event) {
    event.preventDefault()

    homePageProfile.classList.add('off')
    homePageEmail.classList.remove('off')
}

homePage.querySelector('.navigation__anchor--logout').onclick = function(event) {
    event.preventDefault()
    
    homePage.classList.add('off')
    homePageProfile.classList.add('off')
    homePageMain.classList.remove('off')
    loginPage.classList.remove('off')
    loginPage.querySelector('form').reset()

    authenticatedEmail = '';
    loggedUserName = {};
}

homePage.querySelector('.password__anchor--profile').onclick = function(event) {
    event.preventDefault()

    homePagePassword.classList.add('off')
    homePageProfile.classList.remove('off')
}

homePage.querySelector('.email__anchor--profile').onclick = function(event) {
    event.preventDefault()

    homePageEmail.classList.add('off')
    homePageProfile.classList.remove('off')
}

loginPage.querySelector('.input__password--show').onclick = function(event) {
    event.preventDefault()

    showHidePassword()
}

/*TODO: - canvi nom usuari.
        - Foto perfil 20230328 2100
        - canviar alerts per missatges en pantalla?o un toast?
        - try/catch finally per fer clean dels inputs
        - nou script "validators" per afegir tots els throw
        - .trim a email (per evitar espais en blanc)?? 20230328 1955
        - header 20230328 2035
        - refactor dels query selectors a event.target o this
        - 'rest login form' just quan fas login per evitr deixar info en memoria
        - onclick buttons que no tenen linkat cap form no necessiten event.preventdefault()

*/              