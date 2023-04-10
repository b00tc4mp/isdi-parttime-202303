console.log("load home-page");
import {  cleanChangePasswordForm, vanishWarningIn3Seconds, resetUserNameInHeader, updateUserPassword, updateUserAvatar } from "../logic.mjs";
import { context, show, hide, addClass, removeClass  } from "../ui.mjs";
import { logInPage } from "./login-page.mjs";
import { footerSite } from "./footer-page.mjs";

//* VARIABLES DE HOME

export const DEFAUTL_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png";
export const homePage = document.querySelector(".home");
const logOutButton = document.querySelector(".home-header-left-items-log-out-button");
const settingsButton = document.querySelector(".home-header-left-items-config-icon");
const headerMenu = document.querySelector(".home-menu")
//* VARIABLES DE FORMULARIO DE CAMBIO DE CONTRASEÑA 
const changePasswordMenuAnchor = document.querySelector(".home-menu-change-pass-anchor");
const changePasswordMenu = document.querySelector(".change-password-menu");
const cancelChangePasswordButton = document.querySelector(".cancel-change-password");
const changePasswordForm = document.querySelector(".change-password-menu form");
//* VARIABLES DE AVATAR 
export const avatarImage = document.querySelector(".home-header-user-avatar");
const avatarMenuAnchor = document.querySelector(".home-menu-avatar-anchor");
const updateAvatarMenu = document.querySelector(".home-update-avatar-menu"); 
const updateAvatarForm = document.querySelector(".home-update-avatar-menu .form")
const cancelUpdateAvatarButton = document.querySelector(".form-avatar-cancel-button");


//*VARIABLES DE POST 
const postAreaPage = document.querySelector(".home-main-content");

//! PARTE DE HOME
logOutButton.onclick = () => {
    hide(homePage,changePasswordMenu,updateAvatarMenu,footerSite);
    show(postAreaPage);
    headerMenu.classList.remove("home-menu-transition");
    avatarImage.src = DEFAUTL_AVATAR_URL;
    show(logInPage);
    context.userId = null;
    resetUserNameInHeader(context.welcomeMessage);
}
settingsButton.onclick = () => {
    headerMenu.classList.toggle("home-menu-transition");
    hide(changePasswordMenu,updateAvatarMenu);
    removeClass("green",avatarMenuAnchor,changePasswordMenuAnchor);
    postAreaPage.classList.toggle("off");
}

//! PARTE DE CAMBIAR CONTRASEÑAS
changePasswordMenuAnchor.onclick = (event) => {
    event.preventDefault();
    addClass("green", changePasswordMenuAnchor);
    removeClass("green",avatarMenuAnchor);
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
        updateUserPassword(context.userId, oldPassword, newPassword, newPasswordRepetition);
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
    let url = event.target.url.value;
    try {
        updateUserAvatar(context.userId, url);
        show(document.querySelector(".success-avatar-warning"));
        avatarImage.src = url;
        vanishWarningIn3Seconds(document.querySelector(".success-avatar-warning"),"off");
        hide(updateAvatarMenu);
        event.target.url.value = "";
    }catch(error){
        document.querySelector(".home-update-avatar-menu .fail-warning").textContent = (error.message);
    }
})

//*FUNCION TEMPORAL PARA QUITAR TODOS LOS ANCHORS VACIOS TEMPORALES 
document.querySelector(".home-menu-option3").addEventListener("click", (event) => {
    event.preventDefault();
})



// nos falta el footerPage