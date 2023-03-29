var registerPage = document.querySelector('.section.register')
var loginPage = document.querySelector('.section.login')
var homePage = document.querySelector('.section.home')
var bodyPage = document.querySelector('body')
var menuHeader = document.querySelector('header .menu')
var userAccount = document.querySelector('.section.user-account')
var currentUserEmail

registerPage.querySelector('form.register-form').addEventListener('submit', function(event) {
    event.preventDefault()
    
    var name = registerPage.querySelector('input[name="name"').value
    var email = registerPage.querySelector('input[name="email"').value
    var password = registerPage.querySelector('input[name="password"').value
    
    try {
        var checkNewUserIsRegister = registerUser(name,email, password)        
    } catch(error) {
        registerPage.querySelector('.message').classList.add('error')
        registerPage.querySelector('.message').textContent = error.message
    }

    // if(!checkNewUserIsRegister) {
    //     throw new Error('Email already registered')
    // }
    if(checkNewUserIsRegister) {
        loginPage.classList.remove('off')
        registerPage.querySelector('.message').classList.remove('error')
        registerPage.querySelector('.message').innerHTML = 'User created! Please log in'
        registerPage.querySelector('.message').classList.add('success')
        // registerPage.querySelector('form').reset 

        registerPage.querySelector('input[name="name"').value = ''
        registerPage.querySelector('input[name="email"').value = ''
        registerPage.querySelector('input[name="password"').value = ''
        // return true
    }

})
loginPage.querySelector('form.login-form').addEventListener('submit', function(event) {
    event.preventDefault()
    var email = loginPage.querySelector('input[name="email"').value.trim()
    console.log(email)
    var password = loginPage.querySelector('input[name="password"').value
    try {
        authenticateUser(email, password)
        // si no da error
        loginPage.classList.add('off')
        homePage.classList.remove('off')
        bodyPage.classList.add('logged-in')
        userName = gerUserName(email)
        var welcomeUser = document.querySelector('.welcome-user').innerHTML = `Welcome ${userName}!`
        userAccount.querySelector('h2').innerHTML = `Hi ${userName},`
        pushUserDataInForm(email)
    } catch(error) {
        loginPage.querySelector('.message').classList.remove('success')
        loginPage.querySelector('.message').classList.add('error')
        loginPage.querySelector('.message').textContent = error.message     
        console.log(error.message)   
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
    userAccount.querySelector('.button--update-info__profile').disabled = true
    currentUserEmail = userAccount.querySelector('form.user-info input[name="email"]').value
    return currentUserEmail

})

userAccount.querySelector('.button--update-info__cancel-info').addEventListener('click', function(event) {
    event.preventDefault()
    userAccount.querySelector('.user-info').classList.add('off')
    userAccount.querySelector('form.user-info input[name="name"]').disabled = true
    userAccount.querySelector('form.user-info input[name="email"]').disabled = true
    userAccount.querySelector('.button--update-info__profile').removeAttribute('disabled')

})

userAccount.querySelector('.button--update-info__save-info').addEventListener('click', function(event) {
    event.preventDefault()
    
    var email = userAccount.querySelector('form.user-info input[name="email"]').value
    for(i = 0; i < users.length; i++){
        var currentUser = users[i]
        if (currentUser.email === currentUserEmail) {
            var userName = userAccount.querySelector('form.user-info input[name="email"]').value
            try {
                updateUserName(email)
                updateUserEmail(email)
                if (!updateUserEmail) {
                    userAccount.querySelector('.update-info p.message').innerHTML = 'User info changed!'
                }

            } catch (error) {
                loginPage.querySelector('.message').classList.remove('success')
                loginPage.querySelector('.message').classList.add('error')        
                userAccount.querySelector('.message').textContent = error.message     
            }

        }
    }
    
    userAccount.querySelector('.button--update-info__profile').removeAttribute('disabled')
})

userAccount.querySelector('.button--update-info__save-password').addEventListener('click', function(event) {
    event.preventDefault()

    try {
        var email = userAccount.querySelector('form.user-info input[name="email"]').value
        userAccount.querySelector('.button--update-info__password').removeAttribute('disabled')
        updateUserPassword(email) 
    } catch(error) {
        userAccount.querySelector('.update-password p.message').classList.add('error')
        userAccount.querySelector('.update-password p.message').textContent = error.message
    }
})

userAccount.querySelector('.button--update-info__password').addEventListener('click', function(event) {
    event.preventDefault()
    userAccount.querySelector('.user-password').classList.remove('off')
    userAccount.querySelector('.button--update-info__password').disabled = true
    userAccount.querySelector('form.user-password input.current-password').removeAttribute('disabled')
    userAccount.querySelector('form.user-password input.new-password').removeAttribute('disabled')
    userAccount.querySelector('form.user-password input.repeat-password').removeAttribute('disabled')
})

userAccount.querySelector('.button--update-info__cancel-password').addEventListener('click', function(event) {
    event.preventDefault()
    userAccount.querySelector('.user-password').classList.add('off')
    userAccount.querySelector('form.user-password input.current-password').disabled = true
    userAccount.querySelector('form.user-password input.new-password').disabled = true
    userAccount.querySelector('form.user-password input.repeat-password').disabled = true
    userAccount.querySelector('.button--update-info__password').removeAttribute('disabled')
})
