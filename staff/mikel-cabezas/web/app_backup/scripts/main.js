var registerPage = document.querySelector('.section.register')
var loginPage = document.querySelector('.section.login')
var homePage = document.querySelector('.section.home')
var bodyPage = document.querySelector('body')
var menuHeader = document.querySelector('header .menu')
var userAccount = document.querySelector('.section.user-account')
var cacheEmail

registerPage.querySelector('form.register-form').addEventListener('submit', function(event) {
    event.preventDefault()

    
    var name = registerPage.querySelector('input[name="name"').value
    var email = registerPage.querySelector('input[name="email"').value
    var password = registerPage.querySelector('input[name="password"').value
    
        
    var checkNewUserIsRegister = registerUser(name,email, password)

    if(!checkNewUserIsRegister) {
        registerPage.querySelector('.message').classList.add('error')
        registerPage.querySelector('.message').innerHTML = 'Email already registered'
        return false
    }
    if(checkNewUserIsRegister) {
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
        registerPage.querySelector('.message').classList.remove('error')
        registerPage.querySelector('.message').innerHTML = 'User created! Please log in'
        registerPage.querySelector('.message').classList.add('success')
        registerPage.querySelector('input[name="name"').value = ''
        registerPage.querySelector('input[name="email"').value = ''
        registerPage.querySelector('input[name="password"').value = ''
        return true
    }

})
loginPage.querySelector('form.login-form').addEventListener('submit', function(event) {
    event.preventDefault()
    var email = loginPage.querySelector('input[name="email"').value
    var password = loginPage.querySelector('input[name="password"').value
    var checkLoginSuccess = authenticateUser(email, password)
    if(!checkLoginSuccess) {
        loginPage.querySelector('.message').classList.remove('success')
        var errorMessage = loginPage.querySelector('.message').innerHTML = 'User or password incorrect'
        loginPage.querySelector('.message').classList.add('error')
    }
    if(checkLoginSuccess) {
        loginPage.classList.add('off')
        homePage.classList.remove('off')
        bodyPage.classList.add('logged-in')
        userName = gerUserName(email)
        var welcomeUser = document.querySelector('.welcome-user').innerHTML = `Welcome ${userName}!`
        userAccount.querySelector('h2').innerHTML = `Hi ${userName},`
        pushUserDataInForm(email)
    }

})

document.querySelector('.logout').addEventListener('click', function(event) {
    event.preventDefault()
    bodyPage.classList.remove('logged-in')
    registerPage.classList.add('off')
    loginPage.classList.remove('off')
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
menuHeader.querySelector('.submenu-element.login').addEventListener('click', function(event) {
    event.preventDefault()
    loginPage.classList.remove('off')
    registerPage.classList.add('off')
})

menuHeader.querySelector('.submenu-element.register').addEventListener('click', function(event) {
    event.preventDefault()
    registerPage.classList.remove('off')
    loginPage.classList.add('off')
}) 

menuHeader.querySelector('.user-account').addEventListener('click', function(event) {
    event.preventDefault()
    homePage.classList.add('off')
    userAccount.classList.remove('off')
})

userAccount.querySelector('.button--update-info__profile').addEventListener('click', function() {
    userAccount.querySelector('.user-info').classList.remove('off')
    userAccount.querySelector('form.user-info input[name="name"]').removeAttribute('disabled')
    userAccount.querySelector('form.user-info input[name="email"]').removeAttribute('disabled')
})

userAccount.querySelector('.button--update-info__save-info').addEventListener('click', function(event) {
    event.preventDefault()
    var email = userAccount.querySelector('form.user-info input[name="email"]').value
    var oldEmail = users.find(user => user.email === email)
    // if (!cacheEmail) {
    //     cacheEmail = oldEmail
    //     return updateUserInfo(cacheEmail)
    // }
    return updateUserInfo(email)
})

userAccount.querySelector('.button--update-info__save-password').addEventListener('click', function(event) {
    event.preventDefault()
    var email = userAccount.querySelector('form.user-info input[name="email"]').value
    updateUserPassword(email) 
})

userAccount.querySelector('.button--update-info__password').addEventListener('click', function(event) {
    userAccount.querySelector('.user-password').classList.remove('off')
    userAccount.querySelector('form.user-password input.current-password').removeAttribute('disabled')
    userAccount.querySelector('form.user-password input.new-password').removeAttribute('disabled')
    userAccount.querySelector('form.user-password input.repeat-password').removeAttribute('disabled')
})