//Data

const users = [];

users.push({
    id: 'user-1',
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123'
})

users.push({
    id: 'user-2',
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
})

users.push({
    id: 'user-3',
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123'
})

export const posts = []

posts.push({
    id: 'post-1',
    author: 'user-1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png',
    text: 'Smile!',
    date: new Date()
})

posts.push({
    id: 'post-2',
    author: 'user-1',
    image: 'https://img.icons8.com/color/512/avatar.png',
    text: 'I ♥️ Avatars!',
    date: new Date()
})

posts.push({
    id: 'post-3',
    author: 'user-2',
    image: 'https://img.icons8.com/color/512/avatar.png',
    text: 'I ♥️ Avatars too!',
    date: new Date()
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

    if (userPosition === null) {
        return -1;
    }

    return userPosition;
}

function userExistById(id){
    let userPosition = null;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.id === id) {
            userPosition = i;
            break;
        }
    }

    if (userPosition === null) {
        return -1;
    }

    return userPosition;
}

function addUser(name, email, password) {

    if (userExist(email) !== -1) {
        throw new Error("El usuario ya existe");
    }
    
    let id = 'user-1';

    const lastUser = users[users.length - 1];

    if (lastUser){
        id = 'user-' + (parseInt(lastUser.id.slice(5)) + 1);
    }

    users.push({
        id: id,
        name: name,
        email: email,
        password: password
    });
    return true;
}

function authenticateUser(email, password) {
    
    let userPosition = userExist(email);

    if(userPosition === -1){
        throw new Error("El usuario no existe");
    }

    if (users[userPosition].password !== password) {
        throw new Error("Contraseña incorrecta");
    }
    activeUser = { name: users[userPosition].name, id: users[userPosition].id };
}

function getInitials(name) {
    return name.split(" ").map((n) => n[0]).join("");
}

function changePassword(oldpass, newpass, passcheck) {
    let userPosition = userExistById(activeUser.id);
    if (userPosition === -1) {
       throw new Error("El usuario no existe");
    }
    if(oldpass !== users[userPosition].password){
        throw new Error("Contraseña antigua incorrecta");
    }

    if(newpass !== passcheck)
    {
        throw new Error("La nueva contraseña no coincide con su comprobación");
    }

    users[userPosition].password = newpass;
}

function changeMail(oldmail, newmail, mailcheck) {
    let userPosition = userExistById(activeUser.id);
    if (userPosition === -1) {
       throw new Error("El usuario no existe");
    }
   
    if(oldmail !== users[userPosition].email){
        throw new Error("Correo antiguo incorrecto");
    }

    if(newmail !== mailcheck){
        throw new Error("El nuevo correo no corresponde con su comprobación");
    }

    users[userPosition].email = newmail;
}

function retrieveMail(activeUser){
    let userPosition = userExistById(activeUser.id);
    if (userPosition === -1) {
        throw new Error("El usuario no existe");
     }

     return users[userPosition].email;
}


//Presentation

function hideSection(section) {
    section.classList.add('off');
}

/* Para múltiples elementos simultaneamente:
function hideSections(...sections) {
   
    for(let i in sections){
        sections[i].classList.add('off');
    }
}
*/

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

function resetChangeMailView(){
    profileView.querySelector('.mail-old').value=null;
    profileView.querySelector('.mail-new').value=null;
    profileView.querySelector('.mail-new-check').value=null;
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

    try{
        addUser(name, email, password);
        resetRegister();
        hideSection(registerPage);
        showSection(loginPage);
    }
    catch(error){
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
    profileView.querySelector('.profile-email').textContent = retrieveMail(activeUser);
    resetPasswordChangeView();
    resetChangeMailView();
})

profileColumn.querySelector('.button-exit').addEventListener('click', function (event) {
    event.preventDefault();
    activeUser = null;
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

    try{
        changePassword(oldPassword, newPassword, checkPassword);
        alert("La contraseña ha sido cambiada correctamente");
        hideSection(passwordChange);
    }
    catch(error){
        alert(error.message);
    }
    finally{
        resetPasswordChangeView();
    }
})

profileView.querySelector('.button-update-mail').addEventListener('click', function (event) {
    event.preventDefault();
    let oldMail = profileView.querySelector('.mail-old').value;
    let newMail = profileView.querySelector('.mail-new').value;
    let checkMail = profileView.querySelector('.mail-new-check').value;
    
    try{
        changeMail(oldMail, newMail, checkMail);
        alert("Correo cambiado correctamente");
        profileView.querySelector('.profile-email').textContent = activeUser.email;
        hideSection(mailChange);
    }
    catch(error){
        alert(error.message);
    }
    finally{
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