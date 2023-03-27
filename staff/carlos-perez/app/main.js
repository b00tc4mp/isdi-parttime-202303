//Data

let users = [];

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

let activeUser;

//Logic

function userExist(email) {
    let userPosition = null;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.email === email) {
            userPosition = i;
            break;
        }
    }
    if (userPosition !== null) {
        return userPosition;
    }
    else {
        return -1;
    }
}

function addUser(name, email, password) {

    let userPosition = userExist(email);

    if (userPosition === -1) {
        users.push({
            name: name,
            email: email,
            password: password
        });
        return true;
    }
    else {
        return false;
    }

}

function authenticateUser(email, password) {
    let userPosition = userExist(email);

    if (userPosition !== -1 && users[userPosition].password === password) {
        activeUser = { name: users[userPosition].name, email: users[userPosition].email };
        return true;
    }
    else {
        return false;
    }
}

function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
}

function changePassword(oldpass, newpass, passcheck) {
    if ((oldpass === users[userExist(activeUser.email)].password) && (newpass === passcheck)) {
        users[userExist(activeUser.email)].password = newpass;
        return true;
    }
    else {
        return false;
    }
}

function changeMail(oldmail, newmail, mailcheck){
    if((oldmail=users[userExist(activeUser.email)].email) && (newmail===mailcheck)){
        users[userExist(activeUser.email)].email = newmail;
        activeUser.email=newmail;
        return true;
    }
    else{
        return false;
    }
}


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
var header=document.querySelector('.header');
var homeTitle=homePage.querySelector('.title');
var mailChange=profileView.querySelector('.mail-change');
var passwordChange=profileView.querySelector('.password-change');

function resetRegister(){
    registerPage.querySelector('input[id=nombre]').value=null;
    registerPage.querySelector('input[type=email]').value=null;
    registerPage.querySelector('input[type=password]').value=null;
}

function resetLogin(){
    loginPage.querySelector('input[type=email]').value=null;
    loginPage.querySelector('input[type=password]').value=null;
}

function resetProfileView(){
    profileView.querySelector('.password-old').value = null;
    profileView.querySelector('.password-new').value = null;
    profileView.querySelector('.password-new-check').value = null;
}

function headerLogged(){
    hideSection(header);
    showSection(homeTitle);
}

function headerNotLogged(){
    hideSection(homeTitle);
    showSection(header);
}

function initiate() {
    resetRegister();
    resetLogin();
    hideSection(loginPage);
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

    let result = addUser(name, email, password);

    if (result === true) {
        resetRegister();
        registerPage.classList.add('off');
        loginPage.classList.remove('off');
    }
    else {
        alert("Ha habido un error en el registro");
    }


})
document.querySelector('.formulario-login').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = loginPage.querySelector('input[type=email]').value;
    var password = loginPage.querySelector('input[type=password]').value;

    if (authenticateUser(email, password) === true) {
        loginPage.classList.add('off');
        homePage.classList.remove('off');
        headerLogged();
        addProfileNameAndImage(activeUser);
    }
    else {
        alert("Usuario o contraseña incorrectos");
    }


})

registerPage.querySelector('a').addEventListener('click', function (event) {
    event.preventDefault();
    registerPage.classList.add('off');
    loginPage.classList.remove('off');
})

loginPage.querySelector('a').addEventListener('click', function (event) {
    event.preventDefault();
    loginPage.classList.add('off');
    registerPage.classList.remove('off');
})

profileColumn.querySelector('.button-profile').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(homeSaludo);
    showSection(profileView);
    profileView.querySelector('.profile-name').textContent = activeUser.name;
    profileView.querySelector('.profile-email').textContent = activeUser.email;
    resetProfileView();
})

profileColumn.querySelector('.button-exit').addEventListener('click', function (event){
    event.preventDefault();
    activeUser=null;
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
    if (changePassword(oldPassword, newPassword, checkPassword) === true) {
        alert("Contraseña cambiada correctamente");
        hideSection(passwordChange);
    }
    else {
        alert("La contraseña no ha podido cambiarse debido a un error");
    }
})

profileView.querySelector('.button-update-mail').addEventListener('click', function (event) {
    event.preventDefault();
    let oldMail = profileView.querySelector('.mail-old').value;
    let newMail = profileView.querySelector('.mail-new').value;
    let checkMail = profileView.querySelector('.mail-new-check').value;
    if (changeMail(oldMail, newMail, checkMail) === true) {
        alert("Correo cambiado correctamente");
        profileView.querySelector('.profile-email').textContent = activeUser.email;
        hideSection(mailChange);
    }
    else {
        alert("El correo no ha podido cambiarse debido a un error");
    }
})

profileView.querySelector('.button-cancel-mail').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(mailChange);
})

profileView.querySelector('.button-change-mail').addEventListener('click', function (event){
    event.preventDefault();
    hideSection(passwordChange);
    showSection(mailChange);
})

profileView.querySelector('.button-cancel-password').addEventListener('click', function (event) {
    event.preventDefault();
    hideSection(passwordChange);
})

profileView.querySelector('.button-change-password').addEventListener('click', function (event){
    event.preventDefault();
    hideSection(mailChange);
    showSection(passwordChange);
})

profileView.querySelector('.button-close-profile').addEventListener('click', function(event){
    event.preventDefault();
    hideSection(profileView);
    showSection(homeSaludo);
})