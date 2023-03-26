var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')
var authenticatedEmail

loginPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()
    loginPage.classList.add('off')
    homePage.classList.remove('off')

    // TODO how to get all data from inputs
    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value
    var result = authenticateUser(email, password)

    if (!result) {
        alert('wrong email or password')
    } else {
        authenticatedEmail = email
        loginPage.classList.add('off')
        homePage.classList.remove('off')
    }
})

registerPage.querySelector('button').addEventListener('click', function (event) {
    event.preventDefault()
    
    var registerName = registerPage.querySelector('input[name=name]').value
    var registerEmail = registerPage.querySelector('input[name=email]').value
    var registerPassword = registerPage.querySelector('input[name=password]').value
    
    var result = registerUser(registerName, registerEmail, registerPassword)
    
    if (!result) {
        alert('Used mail')
    } else {
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    }
})

loginPage.querySelector('.form__link').addEventListener('click', function (event) {
    event.preventDefault()
        loginPage.classList.add('off')
        registerPage.classList.remove('off')
})

homePage.querySelector('a').addEventListener('click', function (event) {
    event.preventDefault()
})


// TODO show 'hello, username on login
// TODO add link to profile in home page and open a profile panel. Panales de una pagina.
// TODO add a form in profile panel to allow the user to update his/her password (asking current password, and new password and new password confirmation)
