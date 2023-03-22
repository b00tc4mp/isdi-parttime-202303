// data

var users = []

users.push({
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123'
})

users.push({
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
})

users.push({
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123'
})

// logic

// presentation

var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')

registerPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    registerPage.classList.add('off')
    loginPage.classList.remove('off')
})

loginPage.querySelector('form').addEventListener('submit', function (event) {
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
    } else alert('wrong email or password')
})


registerPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    var newName = registerPage.querySelector('input[name=name]').value
    var newEmail = registerPage.querySelector('input[name=email]').value
    var newPassword = registerPage.querySelector('input[name=password]').value

    var existingAccount

    for (var i = 0; i < users.length; i++) {
        var registeredUser = users[i]

        if (registeredUser.email === newEmail) {
            existingAccount = true
            break
        }    
    }

    if (!existingAccount) {
        users.push({
            name: newName,
            email: newEmail,
            password: newPassword
        })
        loginPage.classList.add('off')
        homePage.classList.remove('off')
        
    } else {
        alert('Account already exists')
        loginPage.classList.remove('off')
        homePage.classList.add('off')
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