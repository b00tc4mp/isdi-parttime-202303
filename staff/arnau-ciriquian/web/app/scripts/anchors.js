registerPage.querySelector('.register__anchor--login').onclick = function(event) {
    event.preventDefault()
    showHideContainer(registerPage, loginPage)
    registerPage.querySelector('.register__form').reset()
}

loginPage.querySelector('.login__anchor--register').onclick = function(event) {
    event.preventDefault()
    showHideContainer(registerPage, loginPage)
    loginPage.querySelector('.login__form').reset()
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
    showHideContainer(homePageMain, homePageProfile)
}

homePage.querySelector('.profile__anchor--password').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageProfile, homePagePassword)
}

homePage.querySelector('.profile__anchor--email').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageProfile, homePageEmail)
}

homePage.querySelector('.profile__anchor--username').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageProfile, homePageUsername)
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
    showHideContainer(homePagePassword, homePageProfile)
    homePagePassword.querySelector('.password__form').reset()
}

homePage.querySelector('.email__anchor--profile').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageEmail, homePageProfile)
    homePageEmail.querySelector('.email__form').reset()
}

homePage.querySelector('.username__anchor--profile').onclick = function(event) {
    event.preventDefault()
    showHideContainer(homePageUsername, homePageProfile)
    homePageUsername.querySelector('.username__form').reset()
}