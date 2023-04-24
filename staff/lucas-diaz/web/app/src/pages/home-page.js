
import { context, show, hide, removeClass  } from "../ui.js";
import { logInPage } from "./login-page.js";
import { footerSite } from "./footer-page.js";
import retrievePosts from "../logic/retrieve-posts.js";
import retrieveUser from "../logic/retrieve-user.js";
import updatePostAvatar from "../logic/update-post-avatar.js";
import updatePost from "../logic/update-post.js";
import likeAPost from "../logic/like-a-post.js";
import updatePostLikeIcon from "../logic/update-post-like-icon.js";
import initHeaderMenu from "../components/header-menu.js";
import initAddPostPanel from "../components/add-post-panel.js";

//* VARIABLES DE HOME
const DEFAUTL_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png";
export const homePage = document.querySelector(".home");
const logOutButton = document.querySelector(".home-header-left-items-log-out-button");
const settingsButton = document.querySelector(".home-header-left-items-config-icon");
const welcomeMessage = document.querySelector(".home-header-user-welcome-msj")

//*VARIABLES DE POSTS
export const postsListPanel = document.querySelector(".home-posts-content");

//*VARIABLES DE MODAL DE CREATE POST  

export const postModal = initAddPostPanel(renderPosts, postsListPanel);


 //*VARIABLES PARA EDITAR POST
const editPostModal = document.querySelector(".home-edit-post-modal");
const editPostModalCancelButton = document.querySelector(".home-edit-form-post-cancel-button");
const editPostModalForm = document.querySelector(".home-edit-post-form"); 

//* VARIABLE DE HEADER
const {headerMenu, avatarImage, changePasswordMenu, updateAvatarMenu, avatarMenuAnchor, changePasswordMenuAnchor} = initHeaderMenu(postsListPanel);

//! PARTE DE HOME
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

//*FUNCION TEMPORAL PARA QUITAR TODOS LOS ANCHORS VACIOS TEMPORALES 
document.querySelector(".home-menu-option3").addEventListener("click", (event) => {
    event.preventDefault();
})


//!PARTE DE EDITAR POST MODAL
editPostModalForm.onsubmit = (event) => {
    event.preventDefault();

    const image = event.target.url.value;
    const text = event.target.text.value;
    const postId = event.target.postId.value;
    try{
        updatePost(context.userId, postId, image, text);
        hide(editPostModal);
        postsListPanel.classList.remove("fade");
        postsListPanel.innerHTML ="";
        renderPosts();

    } catch(error){
        alert(error.message)
        failPostMessage.textContent = error.message;
    }
}
editPostModalCancelButton.onclick = (event) => {
    event.preventDefault();
    hide(editPostModal);
    postsListPanel.classList.remove("fade");
}

//! PINTA INFO PARA EL USER
export function renderPosts () {
    try{
        const posts = retrievePosts(context.userId);
        updatePostAvatar(context.userId);
        
        posts.forEach(post => {
            const postItem = document.createElement("article");
            
            const postUserAvatar = document.createElement("img")
            postUserAvatar.classList.add("home-post-content-article-avatar")
            postUserAvatar.src = post.userNameAvatar;
            
            const postUserName = document.createElement("p");
            postUserName.classList.add("home-post-content-article-userName")
            postUserName.textContent = post.userName;

            const postImageContainer = document.createElement("div");
            postImageContainer.classList.add("post-image-container");
            
            const postImg = document.createElement("img");
            postImg.classList.add("home-post-content-article-img");
            postImg.src = post.image;

            postImageContainer.appendChild(postImg);

            const postText = document.createElement("p");
            postText.classList.add("home-post-content-article-text");
            postText.innerText = post.text;

            const likeIcon = document.createElement("span");
            likeIcon.classList.add("material-symbols-rounded");
            likeIcon.textContent = "favorite"
            
            const likeIconText = document.createElement("p");
            likeIconText.classList.add("home-post-content-article-icon-text");
            likeIconText.textContent = `${post.likeCounter.length} likes`;
            
            updatePostLikeIcon(context.userId,post,likeIcon);

            likeIcon.onclick = () => {
                likeAPost(context.userId, post, likeIcon, likeIconText);
            }
            
            const postDate = document.createElement("time");
            postDate.classList.add("home-post-content-article-date");
            postDate.innerText = post.date.toLocaleString();

            if(post.author === context.userId){
                const editPostModalButton = document.createElement("button")
                editPostModalButton.classList.add("home-edit-post-modal-button")
                editPostModalButton.innerText = "Edit"

                editPostModalButton.onclick = () => {
                    editPostModalForm.querySelector(".form-post-url-input").value = post.image;
                    editPostModalForm.querySelector(".home-edit-hidden-input").value = post.id
                    editPostModalForm.querySelector("textarea").value = post.text;
                    show(editPostModal);
                    postsListPanel.classList.add("fade");
                }

                postItem.append(postUserAvatar, postUserName, editPostModalButton, postImageContainer, likeIcon, likeIconText,postText, postDate);
            } else{
                postItem.append(postUserAvatar, postUserName, postImageContainer,likeIcon,likeIconText, postText,postDate);
            }
            postsListPanel.appendChild(postItem);
        })

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

