//data

var users = [];

users.push({
    name: 'wendy Darling',
    email: 'wendy@darling.com',
    password: 'soywendy'
})

users.push({
    name: 'Peter pan',
    email: 'peter@pan.com',
    password: 'soypeter'
})

users.push({
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: 'soypepito'
})

//logic 
for (var i=0; i < users.length; i++) {
    var user = users[i]
}

//presentation

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

    var foundUser
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        if (user.email === email) {
            foundUser = user
            break
        }
    }
    if (foundUser !== undefined && foundUser.password === password) {
        loginPage.classList.add('off')
        homePage.classList.remove('off')
    } else alert('Usuario o contraseña invalidos')
})

registerPage.querySelector('input[type=submit]').addEventListener('click', function (event) {
    event.preventDefault()

    registerPage.classList.add('off')
    loginPage.classList.remove('off')
})

loginPage.querySelector('a').addEventListener('click', function (event) {
    alert('mikel')
    event.preventDefault()
    

    loginPage.classList.add('off')
    registerPage.classList.remove('off')
})

