//Logic

import {addUser, authenticateUser, getInitials, changePassword, changeMail, activeUser, userEmailById, resetActiveUser} from "./logic.js"

//Presentation
function hideSection(section) {
    section.classList.add('off');
}

function showSection(section) {
    section.classList.remove('off');
}

function addProfileNameAndImage(user) {
    document.querySelector('.profile-image-picture-name').textContent = getInitials(user.name);
    document.querySelector('.profile-name').textContent = user.name;
}

var registerPage = document.querySelector('.registro');
var loginPage = document.querySelector('.login');
var homePage = document.querySelector('.home');
var homeSaludo = document.querySelector('.saludo');
var profileColumn = document.querySelector('.profile-column');
var profileView = document.querySelector('.profile-view');
var header = document.querySelector('.header');
var homeTitle = homePage.querySelector('.title');
var mailChange = profileView.querySelector('.mail-change');
var passwordChange = profileView.querySelector('.password-change');

function resetRegister() {
    registerPage.querySelector('input[id=nombre]').value = null;
    registerPage.querySelector('input[type=email]').value = null;
    registerPage.querySelector('input[type=password]').value = null;
}

function resetLogin() {
    loginPage.querySelector('input[type=email]').value = null;
    loginPage.querySelector('input[type=password]').value = null;
}

function resetPasswordChangeView() {
    profileView.querySelector('.password-old').value = null;
    profileView.querySelector('.password-new').value = null;
    profileView.querySelector('.password-new-check').value = null;
}

function resetChangeMailView() {
    profileView.querySelector('.mail-old').value = null;
    profileView.querySelector('.mail-new').value = null;
    profileView.querySelector('.mail-new-check').value = null;
}

function headerLogged() {
    hideSection(header);
    showSection(homeTitle);
}

function headerNotLogged() {
    hideSection(homeTitle);
    showSection(header);
}

function initiate() {
    resetRegister();
    resetLogin();
    hideSection(registerPage);
    hideSection(homePage);
    hideSection(profileView);
    headerNotLogged();
    hideSection(mailChange);
    hideSection(passwordChange);
}

initiate();

document.querySelector('.formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = registerPage.querySelector('input[id=nombre]').value;
    var email = registerPage.querySelector('input[type=email]').value;
    var password = registerPage.querySelector('input[type=password]').value;

    try {
        addUser(name, email, password);
        resetRegister();
        hideSection(registerPage);
        showSection(loginPage);
    }
    catch (error) {
        alert(error.message);
    }
})
document.querySelector('.formulario-login').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = loginPage.querySelector('input[type=email]').value;
    var password = loginPage.querySelector('input[type=password]').value;

    try {
        authenticateUser(email, password);
        hideSection(loginPage);
        showSection(homePage);
        headerLogged();
        addProfileNameAndImage(activeUser);
    }
    catch (error) {
        alert(error.message);
    }
})

registerPage.querySelector('a').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(registerPage);
    showSection(loginPage);
})

loginPage.querySelector('a').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(loginPage);
    showSection(registerPage);
})

profileColumn.querySelector('.button-profile').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(homeSaludo);
    showSection(profileView);
    profileView.querySelector('.profile-name').textContent = activeUser.name;
    profileView.querySelector('.profile-email').textContent = userEmailById(activeUser.id);
    resetPasswordChangeView();
    resetChangeMailView();
})

profileColumn.querySelector('.button-exit').addEventListener('click', function (event) {
    event.preventDefault();
    resetActiveUser();
    
    resetLogin();
    hideSection(homePage);
    headerNotLogged();
    showSection(loginPage);
})

profileView.querySelector('.button-update-password').addEventListener('click', function (event) {
    event.preventDefault();
    let oldPassword = profileView.querySelector('.password-old').value;
    let newPassword = profileView.querySelector('.password-new').value;
    let checkPassword = profileView.querySelector('.password-new-check').value;

    try {
        changePassword(oldPassword, newPassword, checkPassword);
        alert("La contraseña ha sido cambiada correctamente");
        hideSection(passwordChange);
    }
    catch (error) {
        alert(error.message);
    }
    finally {
        resetPasswordChangeView();
    }
})

profileView.querySelector('.button-update-mail').addEventListener('click', function (event) {
    event.preventDefault();
    let oldMail = profileView.querySelector('.mail-old').value;
    let newMail = profileView.querySelector('.mail-new').value;
    let checkMail = profileView.querySelector('.mail-new-check').value;

    try {
        changeMail(oldMail, newMail, checkMail);
        alert("Correo cambiado correctamente");
        profileView.querySelector('.profile-email').textContent = activeUser.email;
        hideSection(mailChange);
    }
    catch (error) {
        alert(error.message);
    }
    finally {
        resetChangeMailView();
    }
})

profileView.querySelector('.button-cancel-mail').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(mailChange);
})

profileView.querySelector('.button-change-mail').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(passwordChange);
    showSection(mailChange);
})

profileView.querySelector('.button-cancel-password').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(passwordChange);
})

profileView.querySelector('.button-change-password').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(mailChange);
    showSection(passwordChange);
})

profileView.querySelector('.button-close-profile').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(mailChange);
    hideSection(passwordChange);
    hideSection(profileView);
    showSection(homeSaludo);
})