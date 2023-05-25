import { registerUser, cleanChangePasswordForm, vanishWarningIn3Seconds, authenticateUser, addUserNameInHeader, resetUserNameInHeader, updateUserPassword, updateUserAvatar } from "./logic.mjs";
import { show, hide, toggle, addClass, removeClass  } from "./ui.mjs";

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
const avatarImage = document.querySelector(".home-header-user-avatar");
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
var authenticatedUserId;

//*VARIABLES DE POST 
const postAreaPage = document.querySelector(".home-main-content");

//*VARIABLES DE FOOTER
const footerSite = document.querySelector(".footer");

//! PARTE DE REGISTER
registerPage.querySelector(".register form").addEventListener('submit', function (event) {
    event.preventDefault();
    const temporalUserName = event.target.name.value;
    const temporalEmail = event.target.email.value;
    const temporalPassword = event.target.password.value;

    try{
        registerUser(temporalUserName, temporalEmail, temporalPassword);
        hide(registerPage);
        show(logInPage);
        show(successRegisterAdivice)
        vanishWarningIn3Seconds(successRegisterAdivice, "off")
    } catch (error){
        failRegisterAdvice.textContent = error.message;
    }
})

//! PARTE DE LOGIN
logInForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value = "LucasDiaz22!";
    try{
        authenticatedUserId = authenticateUser(email, password);
        addUserNameInHeader(authenticatedUserId,welcomeMessage);
        hide(logInPage);
        failLogInAdvice.textContent = "";
        show(homePage);
        show(footerSite);
    }catch(error){
        failLogInAdvice.textContent = error.message;
    }
})
loginRegistrationAnchor.onclick = (event) => {
    event.preventDefault();
    hide(logInPage);
    failLogInAdvice.textContent = "";
    show(registerPage);
}

//! PARTE DE HOME
logOutButton.onclick = () => {
    hide(homePage,changePasswordMenu,updateAvatarMenu,footerSite);
    show(postAreaPage);
    headerMenu.classList.remove("home-menu-transition");
    show(logInPage);
    authenticatedUserId = undefined;
    resetUserNameInHeader(welcomeMessage);
}
settingsButton.onclick = () => {
    headerMenu.classList.toggle("home-menu-transition");
    hide(changePasswordMenu,updateAvatarMenu);
    removeClass("green",avatarMenuAnchor,changePasswordMenuAnchor);
    postAreaPage.classList.toggle("off");
}

//! PARTE DE CAMBIAR CONTRASEÑAS
changePasswordMenuAnchor.onclick = (event) => {
    addClass("green", changePasswordMenuAnchor);
    removeClass("green",avatarMenuAnchor);
    event.preventDefault();
    show(changePasswordMenu);
    hide(updateAvatarMenu);
}
cancelChangePasswordButton.onclick = (event) => {
    event.preventDefault();
    hide(changePasswordMenu);
    cleanChangePasswordForm();
    document.querySelector(".fail-password-match-advise").textContent = "";
}
changePasswordForm.onsubmit = (event) => {
    event.preventDefault();
    const oldPassword = document.querySelector(".old-password");
    const newPassword = document.querySelector(".new-password");
    const newPasswordRepetition = document.querySelector(".new-password-repetition");
    
    try{
        updateUserPassword(authenticatedUserId, oldPassword, newPassword, newPasswordRepetition);
        hide(changePasswordMenu);
        show(document.querySelector(".success-password-change-advise"));
        vanishWarningIn3Seconds(document.querySelector(".success-password-change-advise"),"off");
    } catch(error){
        document.querySelector(".fail-password-match-advise").textContent = error.message;
    }
}

//! PARTE DE AVATAR 
avatarMenuAnchor.onclick = (event) => {
    event.preventDefault();
    addClass("green", avatarMenuAnchor);
    removeClass("green",changePasswordMenuAnchor);
    show(updateAvatarMenu);
    hide(changePasswordMenu);
    cleanChangePasswordForm();
    document.querySelector(".fail-password-match-advise").textContent = "";
}
cancelUpdateAvatarButton.onclick = (event) => {
    event.preventDefault();
    hide(updateAvatarMenu);
}
updateAvatarForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = event.target.url.value;
    try {
        updateUserAvatar(authenticatedUserId, url);
        show(document.querySelector(".success-avatar-warning"));
        avatarImage.src = url;
        vanishWarningIn3Seconds(document.querySelector(".success-avatar-warning"),"off");
        hide(updateAvatarMenu);
    }catch(error){
        document.querySelector(".home-update-avatar-menu .fail-warning").textContent = (error.message);
    }
})


//*FUNCION TEMPORAL PARA QUITAR TODOS LOS ANCHORS VACIOS TEMPORALES 
document.querySelector(".forgot-password-anchor").addEventListener("click", (event) => {
    event.preventDefault();
})
document.querySelector(".home-menu-option3").addEventListener("click", (event) => {
    event.preventDefault();
})




