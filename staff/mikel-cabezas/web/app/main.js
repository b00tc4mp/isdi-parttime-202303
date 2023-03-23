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
    const name = registerPage.querySelector('input[name="name"').value
    const email = registerPage.querySelector('input[name="email"').value
    const password = registerPage.querySelector('input[name="password"').value
    for(i = 0; i < users.length; i++) {
        const user = users[i]
        if(user.email === email) {
            return errorMessage = document.querySelector('.message').innerHTML = 'Email already registered'
        }
        if(user.mail !== email) {
             users.push({
                name: name,
                email: email,
                password: password
            })
            registerPage.classList.add('off')
            loginPage.classList.remove('off')
            document.querySelector('.message').classList.remove('error')
            const messageUserCreated = document.querySelector('.message').innerHTML = 'User created! Please log in'
            document.querySelector('.message').classList.add('success')
            return
        }
    }

})
document.querySelector('.section.login form.login-form').addEventListener('submit', function(event) {
    event.preventDefault()

    const email = loginPage.querySelector('input[name="email"').value
    const password = loginPage.querySelector('input[name="password"').value
    let foundUser
    console.log('email.value', email)
    console.log('password.value', password)
    for(i = 0; i < users.length; i++ ) {
        console.log(users[i].email)
        const user = users[i]
        
        if (user.email !== email || user.password !== password) {
            document.querySelector('.message').classList.remove('success')
            const errorMessage = document.querySelector('.message').innerHTML = 'User or password incorrect'
            document.querySelector('.message').classList.add('error')

        }
        if (user.email === email && user.password === password) {
            alert('match!')
            loginPage.classList.add('off')
            homePage.classList.remove('off')
            bodyPage.classList.add('logged-in')
        }
    } 

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
    registerPage.classList.remove('off')
    loginPage.classList.add('off')
})
document.querySelector('.menu .submenu-element.login').addEventListener('click', function(event) {
    event.preventDefault()
    loginPage.classList.remove('off')
    registerPage.classList.add('off')
})

document.querySelector('.menu .submenu-element.register').addEventListener('click', function(event) {
    event.preventDefault()
    registerPage.classList.remove('off')
    loginPage.classList.add('off')
})