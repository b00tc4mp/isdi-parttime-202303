import {  cleanChangePasswordForm, vanishWarningIn3Seconds } from "../logic/helpers/data-managers.js";
import  updateUserPassword  from "../logic/update-user-password.js";
import  updateUserAvatar  from "../logic/update-user-avatar.js";
import { context, show, hide, addClass, removeClass  } from "../ui.js";
import { logInPage } from "./login-page.js";
import { footerSite } from "./footer-page.js";
import createPost from "../logic/create-post.js";
import retrievePosts from "../logic/retrieve-posts.js";
import retrieveUser from "../logic/retrieve-user.js";


//* VARIABLES DE HOME
const DEFAUTL_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png";
export const homePage = document.querySelector(".home");
const logOutButton = document.querySelector(".home-header-left-items-log-out-button");
const settingsButton = document.querySelector(".home-header-left-items-config-icon");
const headerMenu = document.querySelector(".home-menu")
const welcomeMessage = document.querySelector(".home-header-user-welcome-msj")

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

//*VARIABLES DE POST 
export const postsListPanel = document.querySelector(".home-posts-content");
export const postModal = document.querySelector(".home-add-post-modal");
export const failPostMessage = document.querySelector(".home-add-post-modal form .fail-warning");

//! PARTE DE HOME
logOutButton.onclick = () => {
    hide(homePage,changePasswordMenu,updateAvatarMenu,footerSite,postModal);
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
    hide(changePasswordMenu,updateAvatarMenu,postModal);
    removeClass("green",avatarMenuAnchor,changePasswordMenuAnchor);
    postsListPanel.classList.toggle("off");
    postsListPanel.classList.remove("fade");
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

//! PARTE DEL FORM DEL MODAL
postModal.querySelector(".form").onsubmit = (event) => {
    event.preventDefault();

    const image = event.target.url.value;
    const text = event.target.text.value;

    try{
        createPost(context.userId, image, text);
        hide(postModal);
        event.target.url.value = "";
        event.target.text.value = "";
        failPostMessage.textContent = "";
        postsListPanel.classList.remove("fade");
        renderPosts();

    } catch(error){
        failPostMessage.textContent = error.message;
    }
}

postModal.querySelector(".form-post-cancel-button").onclick = (event) => {
    event.preventDefault();
    hide(postModal);
    postsListPanel.classList.remove("fade");
}

//! PINTA INFO PARA EL USER
export function renderPosts () {
    try{
        
/*         postsListPanel.innerHTML ="";
        

        posts.forEach(post => {
            const postItem = document.createElement("article");

            const image = document.createElement("img")
            image.src = post.image;
            

            const text = document.createElement("p");
            text.innerText = post.text;

            const date = document.createElement("time");
            date.innerText = post.date.toLocaleString();
            postItem.append(image,text,date);

            postsListPanel.appendChild(postItem);
        })
 */
        const posts = retrievePosts(context.userId);
        
        postsListPanel.innerHTML = posts.reduce((accum, post) => {
            return accum + `<article>
                <img src="${post.image}">
                <p>${post.text}</p>
                <time>${post.date.toLocaleString()}</time>
            </article> `
        }, "")

        return true;
    }catch(error){
        alert(error.message)
        return false;
    }
}

export function renderUser(){
    try{
        const currentUser = retrieveUser(context.userId)
        welcomeMessage.textContent = `${currentUser.name}`;
    
        if (currentUser.avatar){
            avatarImage.src = currentUser.avatar;
        } else{
            avatarImage.src = DEFAUTL_AVATAR_URL;
        }
        return true;
        
    } catch (error) {
        alert(error.message);
        return false;
    }
} 

