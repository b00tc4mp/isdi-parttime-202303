import Component from "../library/composito.js";
import likeAPost from "../logic/like-a-post.js";
import updatePostLikeIcon from "../logic/update-post-like-icon.js";
import { context } from "../ui.js";

export default class Post extends Component{
    constructor(post){

        

        super(`<article>
        <img class="home-post-content-article-avatar" src="${post.userNameAvatar}">
        <p class="home-post-content-article-userName">${post.userName}</p>
        <button class="home-edit-post-modal-button">Edit</button>
        <div class="post-image-container">
        <img class="home-post-content-article-img" src="${post.image}">
        </div>
        <span class="material-symbols-rounded">favorite</span>
        <p class="home-post-content-article-icon-text"></p>
        <p class="home-post-content-article-text">${post.text}</p>
        <time class="home-post-content-article-date">${post.date.toLocaleString()}</time>
        </article>`)

        const likeIcon = this.container.querySelector("span");
        const likeIconText = this.container.querySelector(".home-post-content-article-icon-text");
        
        //updatePostLikeIcon(context.userId,post,likeIcon, likeIconText);

        likeIcon.onclick = () => {
            likeAPost(context.userId, post, likeIcon, likeIconText)

            this.onLikePost();
        }

    }

    onLikePost() {
        throw new Error ("not overridden")
    }

}