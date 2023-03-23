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

    var name = registerPage.querySelector('input[name=name]').value
    var email = registerPage.querySelector('input[name=email]').value
    var password = registerPage.querySelector('input[name=password]').value

    var repeatedUser

    for (var i = 0; i < users.length; i++) {
      if (users.some(e => e.email === email)) {
        repeatedUser = true
      }
    }
    
    if (repeatedUser){
      alert('An account is already registered with your email address. Please log in')
    }
    if (!repeatedUser){
      if (password.length <= 7){
        alert('Password is too short. Write a password with more than 7 characters')
      }
      if (password.length > 7){
        users.push({
          name: name,
          email: email,
          password: password
        })

        alert('User successfully created. Redirecting to login screen')
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
      }
    }
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