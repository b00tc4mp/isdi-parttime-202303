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
    
    closeProfilePages()

    if (homePageProfile.classList.contains('off')) {
        homePageMain.classList.add('off')
        homePageProfile.classList.remove('off')
    } else {
        homePageMain.classList.remove('off')
        homePageProfile.classList.add('off')
    }
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

homePage.querySelector('.profile__anchor--email').onclick = function(event) {
    event.preventDefault()

    homePageProfile.classList.add('off')
    homePageEmail.classList.remove('off')
}

homePage.querySelector('.profile__anchor--username').onclick = function(event) {
    event.preventDefault()

    homePageProfile.classList.add('off')
    homePageUsername.classList.remove('off')
}

homePage.querySelector('.navigation__anchor--logout').onclick = function(event) {
    event.preventDefault()
    
    closeProfilePages()

    homePage.classList.add('off')
    homePageProfile.classList.add('off')
    homePageMain.classList.remove('off')
    loginPage.classList.remove('off')

    authenticatedEmail = '';
    loggedUserName = {};
}

homePage.querySelector('.password__anchor--profile').onclick = function(event) {
    event.preventDefault()

    homePagePassword.classList.add('off')
    homePageProfile.classList.remove('off')
}

homePage.querySelector('.email__anchor--profile').onclick = function(event) {
    event.preventDefault()

    homePageEmail.classList.add('off')
    homePageProfile.classList.remove('off')
}

homePage.querySelector('.username__anchor--profile').onclick = function(event) {
    event.preventDefault()

    homePageUsername.classList.add('off')
    homePageProfile.classList.remove('off')
}