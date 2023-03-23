var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')
var authenticatedEmail

registerPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    var name = registerPage.querySelector('input[name=name]').value
    var email = registerPage.querySelector('input[name=email]').value
    var password = registerPage.querySelector('input[name=password]').value

    var result = registerUser(name, email, password)

    if (result === false) {
        alert('user already exists')
    } else {
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    }
})

loginPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value

    var result = authenticateUser(email, password)

    if (result === false) {
        alert('wrong email or password')
    } else {
        authenticatedEmail = email
    
        loginPage.classList.add('off')
        homePage.classList.remove('off')
    }
})

registerPage.querySelector('a').addEventListener('click', function (event) {
    event.preventDefault()

    registerPage.classList.add('off')
    loginPage.classList.remove('off')
})

loginPage.querySelector('a').addEventListener('click', function (event) {
    event.preventDefault()

    loginPage.classList.add('off')
    registerPage.classList.remove('off')
})

// TODO show "hello, <username>" on login
// TODO add link to profile in home page and open a profile panel
// TODO add a form in profile panel to allow the user to update his/her password (asking current password, and new password and new password confirmation)