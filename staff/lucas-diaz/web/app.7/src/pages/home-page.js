
import { context, show } from "../ui.js";
import retrievePosts from "../logic/retrieve-posts.js";
import retrieveUser from "../logic/retrieve-user.js";
import updatePostAvatar from "../logic/update-post-avatar.js";
import likeAPost from "../logic/like-a-post.js";
import updatePostLikeIcon from "../logic/update-post-like-icon.js";
import initHeaderMenu from "../components/header-menu.js";
import initAddPostPanel from "../components/add-post-panel.js";
import initEditPostPanel from "../components/edit-post-panel.js";

//* VARIABLES DE HOME
const DEFAUTL_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png";
export const homePage = document.querySelector(".home");
const welcomeMessage = document.querySelector(".home-header-user-welcome-msj")

//*VARIABLES DE POSTS PANEL
export const postsListPanel = document.querySelector(".home-posts-content");

//*VARIABLES DE MODAL DE CREATE & EDIT POST  
export const postModal = initAddPostPanel(renderPosts, postsListPanel);
const { editPostModal, editPostModalForm } = initEditPostPanel(postsListPanel, renderPosts);

//* VARIABLE DE HEADER
const { avatarImage } = initHeaderMenu(postsListPanel, postModal,editPostModal, DEFAUTL_AVATAR_URL);

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
