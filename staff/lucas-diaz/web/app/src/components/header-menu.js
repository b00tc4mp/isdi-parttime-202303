import { cleanChangePasswordForm, vanishWarningIn3Seconds } from "../logic/helpers/data-managers.js";
import updateUserPassword from "../logic/update-user-password.js";
import updateUserAvatar from "../logic/update-user-avatar.js";
import { context, show, hide, addClass, removeClass } from "../ui.js";
import { renderPosts } from "../pages/home-page.js";
import { footerSite } from "../pages/footer-page.js";
import { homePage } from "../pages/home-page.js";
import { logInPage } from "../pages/login-page.js";

export default function initHeaderMenu(postsListPanel,postModal, editPostModal, DEFAUTL_AVATAR_URL){
    //* VARIABLES MADRE
    const headerMenu = document.querySelector(".home-menu")

    //* VARIABLES DE FORMULARIO DE CAMBIO DE CONTRASEÑA 
    const changePasswordMenuAnchor = document.querySelector(".home-menu-change-pass-anchor");
    const changePasswordMenu = document.querySelector(".change-password-menu");
    const cancelChangePasswordButton = document.querySelector(".cancel-change-password");
    const changePasswordForm = document.querySelector(".change-password-menu form");

    //* VARIABLES DE AVATAR 
    const avatarImage = document.querySelector(".home-header-user-avatar");
    const avatarMenuAnchor = document.querySelector(".home-menu-avatar-anchor");
    const updateAvatarMenu = document.querySelector(".home-update-avatar-menu"); 
    const updateAvatarForm = document.querySelector(".home-update-avatar-menu .form")
    const cancelUpdateAvatarButton = document.querySelector(".form-avatar-cancel-button");

    //* VARIABLES DE SETTINGS Y LOG OUT 
    const settingsButton = document.querySelector(".home-header-left-items-config-icon");
    const logOutButton = document.querySelector(".home-header-left-items-log-out-button");


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

    //! PARTE DE CAMBIAR AVATAR 
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
            postsListPanel.innerHTML ="";
            renderPosts();
        }catch(error){
            document.querySelector(".home-update-avatar-menu .fail-warning").textContent = (error.message);
        }
    })
    
    //!FUNCION TEMPORAL PARA QUITAR TODOS LOS ANCHORS VACIOS TEMPORALES 
    document.querySelector(".home-menu-option3").addEventListener("click", (event) => {
        event.preventDefault();
    })
    
    //! PARTE DE SETTINGS Y LOG OUT 
    logOutButton.onclick = () => {
        hide(homePage,changePasswordMenu,updateAvatarMenu,footerSite,postModal,editPostModal);
        postsListPanel.classList.remove("fade");
        show(postsListPanel);
        headerMenu.classList.remove("home-menu-transition");
        postModal.classList.remove("home-add-post-modal-transition");
        avatarImage.src = DEFAUTL_AVATAR_URL;
        show(logInPage);
        delete context.userId; 
        postsListPanel.innerHTML ="";
    }
    
    settingsButton.onclick = () => {
        headerMenu.classList.toggle("home-menu-transition");
        hide(changePasswordMenu,updateAvatarMenu,postModal,editPostModal);
        removeClass("green",avatarMenuAnchor,changePasswordMenuAnchor);
        postsListPanel.classList.toggle("off");
        postsListPanel.classList.remove("fade");
    }
    
    return { headerMenu, avatarImage }
}

//Holll