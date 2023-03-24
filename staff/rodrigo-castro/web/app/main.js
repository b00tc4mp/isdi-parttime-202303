//data

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

const checkNewUser = (userEmail) => {
    const userFound = users.find(user => user.email === userEmail)
    if(userFound === undefined){
        return false
    } else {
        return true
    }
}

//presentation

var registerPage = document.querySelector('.register-page')
var loginPage = document.querySelector('.login-page')
var homePage = document.querySelector('.home-page')

registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var userName = registerPage.querySelector('.input-field[name=name]').value
    var userEmail = registerPage.querySelector('.input-field[name=email]').value
    var userPassword = registerPage.querySelector('.input-field[name=password]').value

    const isEmailRegistered = checkNewUser(userEmail)

    if (isEmailRegistered) {
        registerPage.querySelector('.red-text').textContent = 'Email already registered'
        registerPage.querySelector('.input-field[name=email]').value = ''
    } else {
        users.push({
            name: userName,
            email: userEmail,
            password: userPassword
        })
        registerPage.querySelector('.red-text').textContent = ''
        registerPage.querySelector('.input-field[name=name]').value = ''
        registerPage.querySelector('.input-field[name=email]').value = ''
        registerPage.querySelector('.input-field[name=password]').value = ''
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    }

})

loginPage.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    var userEmail = loginPage.querySelector('.input-field[name=email]').value
    var userPassword = loginPage.querySelector('.input-field[name=password]').value

    var foundUser

    for (let i = 0; i < users.length; i++) {
        var user = users[i]
        if (user.email === userEmail){
            foundUser = user
            break
        }
    }

    if (foundUser !== undefined && foundUser.password === userPassword) {
        loginPage.classList.add('off')
        homePage.classList.remove('off')
        homePage.querySelector('.logged-user').textContent = ` ${foundUser.name}`
        loginPage.querySelector('.red-text').textContent = ''
        loginPage.querySelector('.input-field[name=email]') = ''
        loginPage.querySelector('.input-field[name=password]') = ''
    } else {
        loginPage.querySelector('.red-text').textContent = 'Wrong email or password'
    }
})


document.querySelector(".go-to-sign-in").addEventListener("click", (event) => {
    event.preventDefault();
    registerPage.classList.add("off");
    loginPage.classList.remove("off")
})

document.querySelector(".register-now-button").addEventListener("click", (event) => {
    event.preventDefault();
    loginPage.classList.add("off");
    registerPage.classList.remove("off");
})