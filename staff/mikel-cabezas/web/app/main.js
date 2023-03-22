const users = []

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

const registerPage = document.querySelector('.section.register')
const loginPage = document.querySelector('.section.login')
const homePage = document.querySelector('.section.home')
const bodyPage = document.querySelector('body')

document.querySelector('.section.register form.register-form').addEventListener('submit', function(event) {
    event.preventDefault()
    registerPage.classList.add('off')
    loginPage.classList.remove('off')
})
document.querySelector('.section.login form.login-form').addEventListener('submit', function(event) {
    event.preventDefault()
    // const email = loginPage.querySelector('input[name="email"').value
    // const password = loginPage.querySelector('input[name="password"').value
    let foundUser

    for(i = 0; i < users.length; i++ ) {

    } 

    loginPage.classList.add('off')
    homePage.classList.remove('off')
    bodyPage.classList.add('logged-in')
})

document.querySelector('.logout').addEventListener('click', function(event) {
    event.preventDefault()
    bodyPage.classList.remove('logged-in')
    registerPage.classList.remove('off')
    loginPage.classList.add('off')
    homePage.classList.add('off')
})

document.querySelector('.login-link a').addEventListener('click', function(event) {
    event.preventDefault()
    loginPage.classList.remove('off')
    registerPage.classList.add('off')
})

document.querySelector('.register-link a').addEventListener('click', function(event) {
    event.preventDefault()
    alert('')
    registerPage.classList.remove('off')
    loginPage.classList.add('off')
})