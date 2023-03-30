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

/*  TODO:   
            - Foto perfil 20230328 2100
            - canviar alerts per missatges en pantalla?o un toast?
            - visibilitat del password en ull?
            - objectiu de la app: xarxa social:
                - rollo ig?
                - ig de stickers?
                - estil twitter?
                - likes, post, comments?

            
    DONE    - ifs del closeProfilePages
            - transformar el .classList.add('off') i .classList.remove('off') a funcions 20230329 2110
            - les funcions del classList en una sola funcio que gestioni totes ls classes que shan dobrir i tancar de cop? amb un for? function(...containers) amb un for dins 2118 
            - fitxers 'utils' : funcio de classList i funcio shw/hide pass?
            - canviar els ifs de off per un toggle (profile-anchor i/o closeProilePages)
*/              