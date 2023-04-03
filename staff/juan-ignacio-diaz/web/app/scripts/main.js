var authenticatedEmail

var registerPage = document.querySelector(".register")
var registerForm = registerPage.querySelector('form')

var loginPage = document.querySelector(".login")
var loginForm = loginPage.querySelector('form')

var homePage = document.querySelector(".home")
var avatarImage = homePage.querySelector('.home-header-avatar')
var profileLink = homePage.querySelector('a')

var profilePanel = homePage.querySelector('.profile')
var updateUserAvatarForm = profilePanel.querySelector('.profile-avatar-form')
var updateUserPasswordForm = profilePanel.querySelector('.profile-password-form')

registerForm.onsubmit = function (event) {
    event.preventDefault()

    event.target.name.remove("imput-highlight")
    event.target.email.remove("imput-highlight")
    event.target.password.remove("imput-highlight")

    var username = event.target.name.value
    var email = event.target.email.value
    var password = event.target.password.value

    try {
        registerUser(username, email, password)

        hide(registerPage)
        show(loginPage)

        event.target.name.value = ""
        event.target.email.value = ""
        event.target.password.value = ""
    }
    catch (error) {
        alert(error.message)

        if (error.cause === "email") { 
            event.target.email.focus()
            event.target.email.classList.add("imput-highlight")
        }

        else if (error.cause === "name") {
            event.target.name.focus()
            event.target.name.classList.add("imput-highlight")
        }
        else if (error.cause === "password") { 
            event.target.password.focus()
            event.target.password.classList.add("imput-highlight")
        }
    }    
}

registerPage.querySelector("a").onclick = function (event) {
    event.preventDefault()

    hide(registerPage)
    show(loginPage)
}

loginForm.onsubmit = function (event) {
    event.preventDefault()

    var email = event.target.email.value
    var password = event.target.password.value

    try {
        authenticateUser(email, password)

        openSession(retrieveUser(email))

        hide(loginPage)

        event.target.password.value = ""

    }
    catch(error) {
        alert(error.message)
    }
}

loginPage.querySelector("a").onclick = function (event) {
    event.preventDefault()

    hide(loginPage)
    show(registerPage)
}

profileLink.onclick = function (event) {
    event.preventDefault()

    show(profilePanel)
}

updateUserAvatarForm.onsubmit = function (event) {
    event.preventDefault()

    var url = event.target.url.value

    try {
        updateUserAvatar(authenticatedEmail, url)

        alert('avatar updated')

        avatarImage.src = url
    } catch (error) {
        alert(error.message)
    }
}

homePage.querySelector("button[name=logout]").onclick = function(event){
    hide(homePage)

    closeSession()
}

updateUserPasswordForm.onsubmit = function (event) {
    event.preventDefault()

    event.target.password.classList.remove("imput-highlight")
    event.target.newPassword.classList.remove("imput-highlight")
    event.target.newPasswordConfirm.classList.remove("imput-highlight")

    var password = event.target.password.value
    var newPassword = event.target.newPassword.value
    var newPasswordConfirm = event.target.newPasswordConfirm.value

    
    try {
        updateUserPassword(authenticatedEmail, password, newPassword, newPasswordConfirm)
        
        alert("the password is update")

        event.target.password.value = ""
        event.target.newPassword.value = ""
        event.target.newPasswordConfirm.cvalue = ""
    }
    catch (error) {

        alert(error.message)

        if (error.cause === "password") {
            event.target.newPassword.focus()
            event.target.password.classList.add("imput-highlight")
            event.target.newPassword.classList.add("imput-highlight")
        }
        else if (error.cause === "newPassword") { 
            event.target.newPassword.focus()
            event.target.newPassword.classList.add("imput-highlight")
        }
        else if (error.cause === "newPasswordConfirm") { 
            event.target.newPasswordConfirm.focus()
            event.target.newPasswordConfirm.classList.add("imput-highlight")
        }
    }
}

function openSession(user) {
    authenticatedEmail = user.email 

    show(homePage)
    hide(profilePanel)

    homePage.querySelector(".name").innerText  = "Helo, " +user.name

    if (user.avatar)
    avatarImage.src = user.avatar

}

function closeSession() {
    authenticatedEmail = ""

    homePage.querySelector(".name").innerText  = ""

    show(loginPage)
}


// cambiar layout de home 2035
//añadir avatar
// cargar avatar si exite
