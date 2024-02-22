var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')
var authenticatedEmail
var profilePanel = homePage.querySelector('.profile')

registerPage.querySelector('form').onsubmit = function (event) {
    event.preventDefault()

    var name = registerPage.querySelector('input[name=name]').value
    var email = registerPage.querySelector('input[name=email]').value
    var password = registerPage.querySelector('input[name=password]').value

    var result = registerUser(name, email, password)

    if (!result) {
        alert('user already exists')
    } else {
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    }
}

loginPage.querySelector('form').onsubmit = function (event) {
    event.preventDefault()

    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value

    try {
        authenticateUser(email, password)

        authenticatedEmail = email

        var foundUser = retrieveUser(email)

        homePage.querySelector('p').innerText = `Hello, ${foundUser.name}!`

        loginPage.classList.add('off')
        homePage.classList.remove('off')
    } catch (error) {
        alert(error.message)
    }
}

registerPage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    registerPage.classList.add('off')
    loginPage.classList.remove('off')
}

loginPage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    loginPage.classList.add('off')
    registerPage.classList.remove('off')
}

homePage.querySelector('a').onclick = function (event) {
    event.preventDefault()

    profilePanel.classList.remove('off')
}

// TODO add a form in profile panel to allow the user to update his/her password (asking current password, and new password and new password confirmation)

profilePanel.querySelector('form').onsubmit = function (event) {
    event.preventDefault()

    var password = profilePanel.querySelector('input[name="password"]').value
    var newPassword = profilePanel.querySelector('input[name="newPassword"]').value
    var newPasswordConfirm = profilePanel.querySelector('input[name="newPasswordConfirm"]').value

    var result = updateUserPassword(authenticatedEmail, password, newPassword, newPasswordConfirm)

    if (!result)
        alert('password update failed')
    else
        alert('password updated')
}