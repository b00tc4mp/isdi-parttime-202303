var authenticatedEmail

var registerPage = document.querySelector('.register')
var registerForm = registerPage.querySelector('form')

var loginPage = document.querySelector('.login')
var loginForm = loginPage.querySelector('form')

var homePage = document.querySelector('.home')
var avatarImage = homePage.querySelector('.home-header-avatar')
var profileLink = homePage.querySelector('a')

var profilePanel = homePage.querySelector('.profile')
var updateUserAvatarForm = profilePanel.querySelector('.profile-avatar-form')
var updateUserPasswordForm = profilePanel.querySelector('.profile-password-form')

registerForm.onsubmit = function (event) {
    event.preventDefault()

    var name = event.target.name.value
    var email = event.target.email.value
    var password = event.target.password.value

    var result = registerUser(name, email, password)

    if (!result) {
        alert('user already exists')
    } else {
        hide(registerPage)
        show(loginPage)
    }
}

registerPage.querySelector('a').onclick = function (event) {
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

        authenticatedEmail = email

        var user = retrieveUser(email)

        profileLink.innerText = user.name

        if (user.avatar)
            avatarImage.src = user.avatar

        loginForm.reset()

        hide(loginPage)
        show(homePage)
    } catch (error) {
        alert(error.message)
    }
}

loginPage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    hide(loginPage)
    show(registerPage)
}

profileLink.onclick = function (event) {
    event.preventDefault()

    show(profilePanel)
}

homePage.querySelector('.home-header-logout').onclick = function () {
    authenticatedEmail = undefined

    hide(homePage, profilePanel)
    show(loginPage)
}

updateUserAvatarForm.onsubmit = function (event) {
    event.preventDefault()

    /* NOTE
    var url0 = event.target.url.value
    var url1 = updateUserAvatarForm.url.value
    var url2 = this.url.value

    console.log(url0, url1, url2)
    */

    var url = event.target.url.value

    try {
        updateUserAvatar(authenticatedEmail, url)

        alert('avatar updated')

        avatarImage.src = url
    } catch (error) {
        alert(error.message)
    }
}

updateUserPasswordForm.onsubmit = function (event) {
    event.preventDefault()

    var password = event.target.password.value
    var newPassword =  event.target.newPassword.value
    var newPasswordConfirm = event.target.newPasswordConfirm.value

    try {
        updateUserPassword(authenticatedEmail, password, newPassword, newPasswordConfirm)

        alert('password updated')
    } catch (error) {
        alert(error.message)
    }
}