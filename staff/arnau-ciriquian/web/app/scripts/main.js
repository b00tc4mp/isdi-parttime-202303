var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')
var homePageProfile = homePage.querySelector('.home__profile')
var homePagePassword = homePage.querySelector('.home__password')
var homePageUsername = homePage.querySelector('.home__username')
var homePageEmail = homePage.querySelector('.home__email')
var homePageMain = homePage.querySelector('.home__main')
var authenticatedEmail
var loggedUserName


registerPage.querySelector('form').onsubmit = function(event) {
    event.preventDefault()

    var newUser = event.target.name.value
    var newEmail = event.target.email.value
    var newPassword = event.target.password.value
    var confirmedPassword = event.target.passwordConfirmation.value

    try {
        addNewUser(newUser, newEmail, newPassword, confirmedPassword)

        registerPage.classList.add('off')
        loginPage.classList.remove('off')
        registerPage.querySelector('form').reset()
    } catch (error) {
        alert(error.message)
    }
}

loginPage.querySelector('form').onsubmit = function(event) {
    event.preventDefault()

    var email = event.target.email.value
    var password = event.target.password.value

    try {
        authenticateUser(email, password)
        authenticatedEmail = email
        var foundUser = getLoggedUser(email)

        loginPage.classList.add('off')
        homePage.classList.remove('off')
        homePageMain.classList.remove('off')
        homePage.querySelector('.home__anchor--profile').innerText = foundUser.name
        loginPage.querySelector('form').reset()
    } catch (error) {
        alert(error.message)
    }
}

homePage.querySelector('.password__form').onsubmit = function(event) {
    event.preventDefault()

    var oldPassword = event.target.oldPassword.value
    var newPassword = event.target.newPassword.value
    var confirmedPassword = event.target.newPasswordConfirmation.value
    var email = authenticatedEmail

    try {
        updateUserPassword(email, oldPassword, newPassword, confirmedPassword)

        homePageProfile.classList.remove('off')
        homePagePassword.classList.add('off')
        homePage.querySelector('.password__form').reset()
    } catch (error) {
        alert(error.message)
    } 
}

homePage.querySelector('.email__form').onsubmit = function(event) {
    event.preventDefault()

    var oldEmail = event.target.oldEmail.value
    var newEmail = event.target.newEmail.value
    var confirmedEmail = event.target.newEmailConfirmation.value
    var password = event.target.emailPassword.value

    try {
        updateUserEmail(oldEmail, newEmail, confirmedEmail, password)

        homePageProfile.classList.remove('off')
        homePageEmail.classList.add('off')
        homePage.querySelector('.email__form').reset()
    } catch (error) {
        alert(error.message)
    }
}

homePage.querySelector('.username__form').onsubmit = function(event) {
    event.preventDefault()

    var oldUsername = event.target.oldUsername.value
    var newUsername = event.target.newUsername.value
    var password = event.target.password.value
    var email = authenticatedEmail

    try {
        updateUsername(email, oldUsername, newUsername, password)

        homePageProfile.classList.remove('off')
        homePageUsername.classList.add('off')
        homePage.querySelector('.username__form').reset()
    } catch (error) {
        alert(error.message)
    }
}

function closeProfilePages() {
// si afegeixo canvi d'avatar afegir el close profile pertinent
    homePageUsername.classList.add('off')
    homePageEmail.classList.add('off')
    homePagePassword.classList.add('off')
}

/*  TODO Web/App:   
            - Foto perfil 20230328 2100
            - canviar alerts per missatges en pantalla?o un toast?
            - al fer logout posar un avatar random per evitar deixar lavatar de lusuari previ
            - tancar ulls de les contrasenyes amb el canvi de pagina. Un if? si type text fer un toggle de fa-eye-slash i canvi de tipus
            - modularitzar: aplicar imports i exports a la web/app
            - passar for basics a for of?
            - objectiu de la app: xarxa social:
                - rollo ig?
                - ig de stickers?
                - estil twitter?
                - likes, post, comments?

    TODO Arrays:
            - metodes amb callback:
                -
            - seguir amb splice
            
    DONE    - 
            -
            -
            -

    PREGUNTES:
            - 
*/              