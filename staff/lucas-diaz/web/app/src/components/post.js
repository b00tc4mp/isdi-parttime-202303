import Component from "../library/composito.js";
import likeAPost from "../logic/like-a-post.js";
import retrieveUser from "../logic/retrieve-user.js";
import updatePostLikeIcon from "../logic/update-post-like-icon.js";
import { context } from "../ui.js";

export default class Post extends Component {
    constructor(post) {
        super(`<article>
        <img class="home-post-content-article-avatar" src="${retrieveUser(context.userId).avatar}">
        <p class="home-post-content-article-userName">${post.userName}</p>
        <button class="home-edit-post-modal-button">Edit</button>
        <div class="post-image-container">
        <img class="home-post-content-article-img" src="${post.image}">
        </div>
        <span class="material-symbols-rounded">favorite</span>
        <p class="home-post-content-article-icon-text">${post.likeCounter.length} ${post.likeCounter.length === 1 ? "like" : "likes"}</p>
        <p class="home-post-content-article-text">${post.text}</p>
        <time class="home-post-content-article-date">${post.date.toLocaleString()}</time>
        </article>`)

        
        const likeIcon = this.container.querySelector("span");
        const likeIconText = this.container.querySelector(".home-post-content-article-icon-text");

        updatePostLikeIcon(context.userId,post,likeIcon, likeIconText);

        likeIcon.onclick = () => {
            try{
                likeAPost(context.userId, post, likeIcon, likeIconText)
    
                this.onLikeToggled();
                
            }catch(error){
                alert(error.message);
            }
        }

    }

    onLikeToggled() {
        throw new Error("not overridden")
    }

}