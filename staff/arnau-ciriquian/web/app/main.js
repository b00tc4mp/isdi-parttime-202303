// data

var users = [];

users.push({
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123',
})

users.push({
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123',
})

users.push({
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123',
})

// Logic

// Presentation

var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')

registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    //register new user - Arnau's aproach
    var newUser = registerPage.querySelector('input[name=name]').value
    var newEmail = registerPage.querySelector('input[name=email]').value
    var newPassword = registerPage.querySelector('input[name=password]').value
    
    var registeredEmails = []


    for (var i = 0; i < users.length; i++) {
        registeredEmails.push(users[i].email)
    }
    
    if (!registeredEmails.includes(newEmail)) {
        users.push({
            name: newUser,
            email: newEmail,
            password: newPassword,
        })
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    } else (alert('User already registered!'))
    //
    // registerPage.classList.add('off')
    // loginPage.classList.remove('off')
})

loginPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

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

        //User name test
        homePage.querySelector('.home-tittle').innerHTML = `Welcome ${foundUser.name}!`
        //

    } else alert('wrong email or password')

    //Easter Egg
    if (foundUser === undefined && password === 'orange') {
            document.querySelector('.pattern-hex').classList.add('orange-hex')
            document.querySelector('.pattern-hex').classList.remove('blue-hex')
            document.querySelector('.pattern-color').classList.add('green-gradient')
            document.querySelector('.pattern-color').classList.remove('purple-gradient')
    }
    //
})

registerPage.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault()

    registerPage.classList.add('off')
    loginPage.classList.remove('off')
})

loginPage.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault()

    loginPage.classList.add('off')
    registerPage.classList.remove('off')
})