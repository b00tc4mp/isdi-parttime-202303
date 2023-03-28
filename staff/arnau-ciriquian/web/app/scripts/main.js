var registerPage = document.querySelector('.register')
var loginPage = document.querySelector('.login')
var homePage = document.querySelector('.home')
var homePageProfile = homePage.querySelector('.home__profile')
var homePagePassword = homePage.querySelector('.home__password')
var homePageMain = homePage.querySelector('.home__main')

registerPage.querySelector('form').onsubmit = function(event) {
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
}

loginPage.querySelector('form').onsubmit = function(event) {
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
        homePageMain.classList.remove('off')
        homePage.querySelector('.home__tittle').innerText = `Welcome, ${loggedUser.name}!`
    }
}

registerPage.querySelector('.register__anchor--login').onclick = function(event) {
    event.preventDefault()
    
    registerPage.classList.add('off')
    loginPage.classList.remove('off')
}

loginPage.querySelector('.login__anchor--register').onclick = function(event) {
    event.preventDefault()
    
    loginPage.classList.add('off')
    registerPage.classList.remove('off')
}

homePage.querySelector('.home__anchor--profile').onclick = function(event) {
    event.preventDefault()
    
    homePageMain.classList.add('off')
    homePageProfile.classList.remove('off')
    homePage.querySelector('.profile__user').innerHTML = loggedUser.name
}

homePage.querySelector('.profile__anchor--home').onclick = function(event) {
    event.preventDefault()
    
    homePageMain.classList.remove('off')
    homePageProfile.classList.add('off')
}

homePage.querySelector('.profile__anchor--password').onclick = function(event) {
    event.preventDefault()

    homePageProfile.classList.add('off')
    homePagePassword.classList.remove('off')
}

homePage.querySelector('.profile__anchor--logout').onclick = function(event) {
    event.preventDefault()
    
    homePage.classList.add('off')
    homePageProfile.classList.add('off')
    homePageMain.classList.remove('off')
    loginPage.classList.remove('off')
    loginPage.querySelector('form').reset()

    loggedUser = {};
}

homePage.querySelector('.password__form').onsubmit = function(event) {
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
    
    if (oldPassword === newPassword) {
        return alert('Please make sure that the new password is different than the old one!')
    }

    //la capa presentacio no hauria daccedir a la capa data, hauria de passar per logic i viceversa

    //de moment no canvia el password
    loggedUser.password = newPassword
    
    homePageProfile.classList.remove('off')
    homePagePassword.classList.add('off')
}

homePage.querySelector('.password__anchor--profile').onclick = function(event) {
    event.preventDefault()

    homePagePassword.classList.add('off')
    homePageProfile.classList.remove('off')
}

loginPage.querySelector('.input__password--show').onclick = function(event) {
    event.preventDefault()

    showHidePassword()
}

//TODO: canvi mail i nom usuari. Foto perfil?
//fer canvi a try/catch

//DONE 20230328 -   Implementar BEM
//                  New pass != old pass
//                  Refactor dels queryselectors a vars
//                  logica show password a login