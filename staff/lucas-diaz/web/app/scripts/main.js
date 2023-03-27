// presentation
const registerPage = document.querySelector(".register");

const logInPage = document.querySelector(".login")
const logInForm = document.querySelector(".login form");
const loginRegistrationAnchor = document.querySelector(".login .register-anchor");

const homePage = document.querySelector(".home");
const logOutButton = document.querySelector(".log-out-button");
const welcomeMessage = document.querySelector(".welcome-msj");

const successRegisterAdivice = document.querySelector(".success-advice-p");
const failRegisterAdvice = document.querySelector(".register .fail-advice-p");
const failLogInAdvice = document.querySelector(".login .fail-advice-p")
var authenticatedEmail

//* VARIABLES DE FORMULARIO DE CAMBIO DE CONTRASEÑA 
const changePasswordMenuAnchor = document.querySelector(".change-pass-anchor");
const changePasswordMenu = document.querySelector(".change-password-menu");
const cancelChangePasswordButton = document.querySelector(".cancel-change-password");
const changePasswordForm = document.querySelector(".change-password-menu form");


registerPage.querySelector("form").addEventListener('submit', function (event) {
    event.preventDefault();
    
    var temporalUser = {
        name: registerPage.querySelector("input[type=text]").value,
        email: registerPage.querySelector("input[type=email]").value,
        password: registerPage.querySelector("input[type=password]").value
    }
    var result = registerUser(temporalUser);

    if(!result){
        failRegisterAdvice.classList.remove("off");
        set3SecondsAdvice(failRegisterAdvice,"off")
        cleanUser(registerPage);
    } else {
        registerPage.classList.add("off");
        logInPage.classList.remove("off");
        successRegisterAdivice.classList.remove("off");
        set3SecondsAdvice(successRegisterAdivice, "off")
    }
})
logInForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = logInPage.querySelector('input[name=email]').value
    var password = logInPage.querySelector('input[name=password]').value
    var result = authenticateUser(email,password);

    if (!result) {
        failLogInAdvice.classList.remove("off");
        set3SecondsAdvice(failLogInAdvice,"off")
    } else {
        authenticatedEmail = email;
        addUserNameInHeader(authenticatedEmail);

        logInPage.classList.add("off");
        homePage.classList.remove("off");
    }
})
loginRegistrationAnchor.addEventListener("click", function (event){
    event.preventDefault();
    logInPage.classList.add("off");
    registerPage.classList.remove("off");
})
logOutButton.addEventListener("click", () => {
    homePage.classList.add("off");
    logInPage.classList.remove("off");
    authenticatedEmail = "";
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
    let oldPassword = document.querySelector(".old-password");
    let newPassword = document.querySelector(".new-password");
    let newPasswordRepetition = document.querySelector(".new-password-repetition");
    oldPassword.value = "";
    newPassword.value = "";
    newPasswordRepetition.value = "";
})
changePasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let oldPassword = document.querySelector(".old-password");
    let newPassword = document.querySelector(".new-password");
    let newPasswordRepetition = document.querySelector(".new-password-repetition");

    let confirmation = updateUserPassword(authenticatedEmail, oldPassword, newPassword, newPasswordRepetition);

    if (confirmation){
        changePasswordMenu.classList.add("off");
        document.querySelector(".success-password-change-advise").classList.remove("off");
        set3SecondsAdvice(document.querySelector(".success-password-change-advise"),"off");
    }
})





