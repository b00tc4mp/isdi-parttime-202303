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

function registerUser(name, email, password) {
    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

    if (foundUser !== undefined) {
        return false
    }

    users.push({
        name: name,
        email: email,
        password: password
    })

    return true
}

function authenticateUser(email, password) {
    var foundUser

    for (var i = 0; i < users.length; i++) {
        var user = users[i]

        if (user.email === email) {
            foundUser = user

            break
        }
    }

    if (foundUser === undefined) {
        return false
    }

    if (foundUser.password !== password) {
        return false
    }

    return true
}

// presentation

var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')

registerPage.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    var name = registerPage.querySelector('input[name=name]').value
    var email = registerPage.querySelector('input[name=email]').value
    var password = registerPage.querySelector('input[name=password]').value

    var result = registerUser(name, email, password)

    if (result === false) {
        alert('user already exists')

        // TODO mark email input in red
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