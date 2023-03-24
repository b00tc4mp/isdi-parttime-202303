var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')

registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    // TODO how to get all data from inputs
    registerPage.classList.add('off')
    loginPage.classList.remove('off')
})

loginPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    // TODO how to get all data from inputs
    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value
    var result = authenticateUser(email, password)
    var foundUser

    if (!result) {
        alert('aaa')
    } else {
        loginPage.classList.add('off')
        homePage.classList.remove('off')
    }
})

registerPage.querySelector('button').addEventListener('click', function (event) {
    event.preventDefault()
    var registerName = registerPage.querySelector('input[name=name]').value
    var registerEmail = registerPage.querySelector('input[name=email]').value
    var registerPassword = registerPage.querySelector('input[name=password]').value
    var registerConfirmedPassword = registerPage.querySelector('input[name=confirm-password]').value   
})

loginPage.querySelector('.form__link').addEventListener('click', function (event) {
    alert('test')
    event.preventDefault()
    loginPage.classList.add('off')
    registerPage.classList.remove('off')
})


// TODO show 'hello, username on login
// TODO add link to profile in home page and open a profile panel. Panales de una pagina.
// TODO add a form in profile panel to allow the user to update his/her password (asking current password, and new password and new password confirmation)
