var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')

registerPage.querySelector('form').addEventListener('submit',
function(event) {
    event.preventDefault()

    registerPage.classList.add('off')
    loginPage.classList.remove('off')
})

loginPage.querySelector('form').addEventListener('submit', 
function(event) {
    event.preventDefault ()
    var email = loginPage.querySelector('input[name=Email]').value
    var password = loginPage.querySelector('input[name=Password]').value
    var result = authenticateUser(email, password)

    if (!result) {
        alert('invalid data')
    } else {
        loginPage.classList.add('off')
        homePage.classList.remove('off')
    }   
})
registerPage.querySelector('.register__button').addEventListener('click', function (event) {
    event.preventDefault()

    registerPage.classList.add('off')
    loginPage.classList.remove('off')
})

loginPage.querySelector('button').addEventListener('click', function (event) {
    event.preventDefault()

    loginPage.classList.add('off')
    homePage.classList.remove('off')    
})

loginPage.querySelector('.login__register').addEventListener('click', function(event) {

    event.preventDefault()

    loginPage.classList.add('off')
    registerPage.classList.remove('off')
})