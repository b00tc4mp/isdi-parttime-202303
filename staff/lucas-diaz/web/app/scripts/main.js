// presentation
//*VARIABLES DE REGISTER
const registerPage = document.querySelector(".register");
//* VARIABLES DE LOGIN
const logInPage = document.querySelector(".login")
const logInForm = document.querySelector(".login form");
const loginRegistrationAnchor = document.querySelector(".login .register-anchor");
//* VARIABLES DE HOME
const homePage = document.querySelector(".home");
const welcomeMessage = document.querySelector(".welcome-msj");
const logOutButton = document.querySelector(".log-out-button");
//* VARIABLES WARNINGS
const successRegisterAdivice = document.querySelector(".success-advice-p");
const failRegisterAdvice = document.querySelector(".fail-register-warning");
const failLogInAdvice = document.querySelector(".fail-login-advice-p")
//* VARIABLES DE FORMULARIO DE CAMBIO DE CONTRASEÑA 
const changePasswordMenuAnchor = document.querySelector(".change-pass-anchor");
const changePasswordMenu = document.querySelector(".change-password-menu");
const cancelChangePasswordButton = document.querySelector(".cancel-change-password");
const changePasswordForm = document.querySelector(".change-password-menu form");

var authenticatedEmail

//! PARTE DE REGISTER
registerPage.querySelector("form").addEventListener('submit', function (event) {
    event.preventDefault();
    var temporalUser = {
        name: registerPage.querySelector("input[type=text]").value,
        email: registerPage.querySelector("input[type=email]").value,
        password: registerPage.querySelector("input[type=password]").value
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
        email: logInPage.querySelector(".email").value,
        password: logInPage.querySelector(".password").value
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
})
//! PARTE DE CAMBIAR CONTRASEÑAS
changePasswordMenuAnchor.addEventListener("click", (event) => {
    event.preventDefault();
    changePasswordMenu.classList.remove("off");
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





















//*FUNCION TEMPORAL PARA QUITAR TODOS LOS ANCHORS VACIOS TEMPORALES 

document.querySelector(".forgot-password-anchor").addEventListener("click", (event) => {
    event.preventDefault();
})
document.querySelector(".option2").addEventListener("click", (event) => {
    event.preventDefault();
})
document.querySelector(".option3").addEventListener("click", (event) => {
    event.preventDefault();
})



