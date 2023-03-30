// presentation
//*VARIABLES DE REGISTER
const registerPage = document.querySelector(".register");
//* VARIABLES DE LOGIN
const logInPage = document.querySelector(".login")
const logInForm = document.querySelector(".login form");
const loginRegistrationAnchor = document.querySelector(".login-register-anchor");
//* VARIABLES DE HOME
const homePage = document.querySelector(".home");
const welcomeMessage = document.querySelector(".home-header-user-welcome-msj");
const logOutButton = document.querySelector(".home-header-left-items-log-out-button");
const settingsButton = document.querySelector(".home-header-left-items-config-icon");
const headerMenu = document.querySelector(".home-menu")
//* VARIABLES WARNINGS
const successRegisterAdivice = document.querySelector(".login-success-warning");
const failRegisterAdvice = document.querySelector(".register .fail-warning");
const failLogInAdvice = document.querySelector(".login .fail-warning")
//* VARIABLES DE FORMULARIO DE CAMBIO DE CONTRASEÑA 
const changePasswordMenuAnchor = document.querySelector(".home-menu-change-pass-anchor");
const changePasswordMenu = document.querySelector(".change-password-menu");
const cancelChangePasswordButton = document.querySelector(".cancel-change-password");
const changePasswordForm = document.querySelector(".change-password-menu form");
//* VARIABLES DE AVATAR 
const avatarMenuAnchor = document.querySelector(".home-menu-avatar-anchor");
const updateAvatarMenu = document.querySelector(".home-update-avatar-menu"); 
const updateAvatarForm = document.querySelector(".home-update-avatar-menu .form")
const cancelUpdateAvatarButton = document.querySelector(".form-avatar-cancel-button");
var authenticatedEmail

//! PARTE DE REGISTER
registerPage.querySelector(".register form").addEventListener('submit', function (event) {
    event.preventDefault();
    var temporalUser = {
        name: registerPage.querySelector(".register .form-username").value,
        email: registerPage.querySelector(".register .form-email").value,
        password: registerPage.querySelector(".register .form-password").value
    }
    try{
        registerUser(temporalUser);
        registerPage.classList.add("off");
        logInPage.classList.remove("off");
        successRegisterAdivice.classList.remove("off");
        vanishWarningIn3Seconds(successRegisterAdivice, "off")
    } catch (error){
        failRegisterAdvice.textContent = error.message;
    }
})

//! PARTE DE LOGIN
logInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var temporalUser = {
        email: logInPage.querySelector(".login .form-email").value,
        password: logInPage.querySelector(".login .form-password").value
    }
    try{
        authenticateUser(temporalUser);
        authenticatedEmail = temporalUser.email;
        addUserNameInHeader(authenticatedEmail);
        logInPage.classList.add("off");
        homePage.classList.remove("off");
    }catch(error){
        failLogInAdvice.textContent = error.message;
    }
})
loginRegistrationAnchor.addEventListener("click", function (event){
    event.preventDefault();
    logInPage.classList.add("off");
    registerPage.classList.remove("off");
})

//! PARTE DE HOME
logOutButton.addEventListener("click", () => {
    homePage.classList.add("off");
    changePasswordMenu.classList.add("off");
    logInPage.classList.remove("off");
    authenticatedEmail = undefined;
    resetUserNameInHeader();
    headerMenu.classList.remove("home-menu-transition");
})
settingsButton.addEventListener("click",() => {
    headerMenu.classList.toggle("home-menu-transition");
})


//! PARTE DE CAMBIAR CONTRASEÑAS
changePasswordMenuAnchor.addEventListener("click", (event) => {
    event.preventDefault();
    changePasswordMenu.classList.remove("off");
    //TODO encapsular esto en una funcion porque lo vamos a necesitar entre los anchors 
    event.preventDefault();
    updateAvatarMenu.classList.add("off");
})
cancelChangePasswordButton.addEventListener("click", (event) => {
    event.preventDefault();
    changePasswordMenu.classList.add("off");
    cleanChangePasswordForm();
    document.querySelector(".fail-password-match-advise").textContent = "";
})
changePasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let oldPassword = document.querySelector(".old-password");
    let newPassword = document.querySelector(".new-password");
    let newPasswordRepetition = document.querySelector(".new-password-repetition");
    try{
        updateUserPassword(authenticatedEmail, oldPassword, newPassword, newPasswordRepetition);
        changePasswordMenu.classList.add("off");
        document.querySelector(".success-password-change-advise").classList.remove("off");
        vanishWarningIn3Seconds(document.querySelector(".success-password-change-advise"),"off");
    } catch(error){
        document.querySelector(".fail-password-match-advise").textContent = error.message;
    }
})


//! PARTE DE AVATAR 
avatarMenuAnchor.addEventListener("click", (event) => {
    event.preventDefault();
    updateAvatarMenu.classList.remove("off")
    //TODO encapsular esto en una funcion porque lo vamos a necesitar entre los anchors 
    changePasswordMenu.classList.add("off");
    cleanChangePasswordForm();
    document.querySelector(".fail-password-match-advise").textContent = "";
})
cancelUpdateAvatarButton.addEventListener("click", (event) => {
    event.preventDefault();
    updateAvatarMenu.classList.add("off");
})
updateAvatarForm.addEventListener("submit", (event) => {
    event.preventDefault();
})









//*FUNCION TEMPORAL PARA QUITAR TODOS LOS ANCHORS VACIOS TEMPORALES 

document.querySelector(".forgot-password-anchor").addEventListener("click", (event) => {
    event.preventDefault();
})
document.querySelector(".home-menu-option3").addEventListener("click", (event) => {
    event.preventDefault();
})



/*
TODO ORGANIZAR EL HTML 
TODO ORGANIZAR EL CSS CON BEM NAMING 
TODO EN EL NAV MENU, TENEMOS QUE MANTENER DE VERDE DONDE ESTEMOS ACTUALMENTE PARA QUE EL USER SEPA DONDE ESTAMOS EN TODO MOMENTO.
TODO HACER LA FUNCION DE CAMBIAR AVATAR 
TODO HACER FUNCIONES DE SHOW-HIDE, QUE PUEDA ACEPTAR TANTOS ARGUMENTOS COMO QUIERA (TOOLS) 
TODO VOLVER A MIRAR FUNCIONES DE MAIN POR SI SE REPITE ALGO 
TODO METER MAS VALIDACIONES, LAS DE CONTRASEÑA Y LAS DE EMAIL.
*/