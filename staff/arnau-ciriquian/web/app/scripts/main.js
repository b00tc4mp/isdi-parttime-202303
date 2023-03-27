var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')

registerPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var newUser = registerPage.querySelector('input[name=name]').value
    var newEmail = registerPage.querySelector('input[name=email]').value
    var newPassword = registerPage.querySelector('input[name=password]').value
    var confirmedPassword = registerPage.querySelector('input[name=password-confirmation]').value

    var passwordCharacters = confirmPasswordCharacters(newPassword)
    var passwordResult = confirmSamePassword(newPassword, confirmedPassword)
    var result = confirmUser(newEmail)

    if (!result) {
        return alert('User already registered!')
    } 

    if (!passwordCharacters) {
        return alert('Please, make sure that your password is at least 4 characters long, has an uppercase, a lowercase and a number')
    }

    if (!passwordResult) {
        return alert('Please make sure that the password confimation is the same as the password!')
    }
    
    if (result && passwordCharacters && passwordResult) {
        addNewUser(newUser, newEmail, newPassword)
        registerPage.classList.add('off')
        loginPage.classList.remove('off')
    }
})

loginPage.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault()

    var email = loginPage.querySelector('input[name=email]').value
    var password = loginPage.querySelector('input[name=password]').value

    var result = authenticateUser(email, password)
    
    if (!result) {
        alert('wrong email or password')
    } else {
        getLoggedUser(email)
        loginPage.classList.add('off')
        homePage.classList.remove('off')
        homePage.querySelector('.home__main').classList.remove('off')
        homePage.querySelector('.home-tittle').innerHTML = `Welcome ${loggedUser.name}!`
    }
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

homePage.querySelector('.profile__anchor').addEventListener('click', function(event) {
    event.preventDefault()
    
    homePage.querySelector('.home__main').classList.add('off')
    homePage.querySelector('.home__profile').classList.remove('off')
    homePage.querySelector('.profile__user').innerHTML = loggedUser.name
})

homePage.querySelector('.home__anchor').addEventListener('click', function(event) {
    event.preventDefault()
    
    homePage.querySelector('.home__main').classList.remove('off')
    homePage.querySelector('.home__profile').classList.add('off')
})

homePage.querySelector('.profile__password').addEventListener('click', function(event) {
    event.preventDefault()

    homePage.querySelector('.home__profile').classList.add('off')
    homePage.querySelector('.home__password').classList.remove('off')
})

homePage.querySelector('.logout').addEventListener('click', function(event) {
    event.preventDefault()
    
    homePage.classList.add('off')
    homePage.querySelector('.home__profile').classList.add('off')
    homePage.querySelector('.home__main').classList.remove('off')
    loginPage.classList.remove('off')
    loginPage.querySelector('form').reset()

    loggedUser = {};
})

homePage.querySelector('.password-form').addEventListener('submit', function(event) {
    event.preventDefault()

    var oldPassword = homePage.querySelector('input[name=old-password]').value
    var newPassword = homePage.querySelector('input[name=new-password]').value
    var confirmedPassword = homePage.querySelector('input[name=new-password-confirmation]').value
    var email = loggedUser.email

    var passwordCharacters = confirmPasswordCharacters(newPassword)
    var passwordResult = confirmSamePassword(newPassword, confirmedPassword)
    var oldPasswordConfirmation = authenticateUser(email, oldPassword)

    if (!oldPasswordConfirmation) {
        return alert('Please make sure to insert your correct actual password')
    }

    if (!passwordCharacters) {
        return alert('Please, make sure that your password is at least 4 characters long, has an uppercase, a lowercase and a number')
    }

    if (!passwordResult) {
        return alert('Please make sure that the password confimation is the same as the password!')
    }
    
    if (oldPasswordConfirmation && passwordCharacters && passwordResult) {
        updateUserPassword(loggedUser.email, newPassword)
        homePage.querySelector('.home__profile').classList.remove('off')
        homePage.querySelector('.home__password').classList.add('off')
    }
})

homePage.querySelector('.password-to-profile').addEventListener('click', function(event) {
    event.preventDefault()

    homePage.querySelector('.home__password').classList.add('off')
    homePage.querySelector('.home__profile').classList.remove('off')
})