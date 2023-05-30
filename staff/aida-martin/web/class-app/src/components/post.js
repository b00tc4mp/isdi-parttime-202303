import { Component } from "../library/composito.js";
import formatLikes from "../logic/helpers/utils.js";
import toggleLikePost from "../logic/toggle-like-post.js";
import toggleSavePost from "../logic/toggle-save-post.js";
import retrieveUser from "../logic/retrieve-user.js";
import { context } from "../ui.js";

export default class Post extends Component {
  constructor(post, currentUser, defaultAvatar) {
    super(`<article data-id="${post.id}">
    <div class="user-container-post">
    <img class="post-avatar" src="">
    <p class="post-user"></p>
    </div>
    <div class="image-container-post">
    <img class="post-image" src="${post.image}">
    </div>
    <div class="likes-saves-container">
    <span class="material-symbols-outlined likes ${
      post.likes && post.likes.includes(context.userId) ? "fill" : "unfill"
    }">favorite</span>
    <p class="count-likes"></p>
    <span class="material-symbols-outlined saves ${
      currentUser.saves && currentUser.saves.includes(post.id)
        ? "fill"
        : "unfill"
    }">bookmark</span>
    </div>
    <time class="post-date">${post.date.toLocaleString("en-GB")}</time>
    <p class="post-text">${post.text}</p>
    ${
      post.author === context.userId
        ? "<button class='edit-post-button button'>EDIT</button>"
        : ""
    }
    </article>`);

    const postAuthor = retrieveUser(post.author);

    this.container.querySelector(".post-avatar").src = postAuthor.avatar
      ? postAuthor.avatar
      : defaultAvatar;

    this.container.querySelector(".post-user").innerText = postAuthor.name;

    this.container.querySelector(".count-likes").innerText = formatLikes(post);

    this.container.querySelector(".likes").onclick = () => {
      toggleLikePost(context.userId, post.id);

      this.onLikeToggled();
    };

    this.container.querySelector(".saves").onclick = () => {
      toggleSavePost(context.userId, post.id);

      this.onSaveToggled();
    };
  }

  onLikeToggled() {
    throw new Error("Not overridden");
  }

  onSaveToggled() {
    throw new Error("Not overridden");
  }
}
