import { Component } from "../library/composito.js";
import retrievePosts from "../logic/retrieve-posts.js";
import Posts from "../components/posts.js";
import { context, show, hide, toggle } from "../ui.js";
//import { loginPage } from "./login-page.js";
//import formatDate from "../logic/helpers/format-date.js";
// import retrievePosts from "../logic/retrieve-posts.js";
import retrieveUser from "../logic/retrieve-user.js";
// import initProfilePanel from "../components/profile-panel.js";
// import initAddPostPanel from "../components/add-post-panel.js";
// import initEditPostPanel from "../components/edit-post-panel.js";
// import toggleLikePost from "../logic/toggle-like-post.js";
// import toggleSavePost from "../logic/toggle-save-post.js";

export default class Home extends Component {
  constructor() {
    super(`<section class="home">
    <div class="home-header">
      <h1 class="home-title title">HOME</h1>

      <div class="home-header-nav">
        <img class="avatar home-header-avatar" src="" alt="" />
        <a href="" class="profile-link">Profile</a>

        <button class="button profile-logout-button">LOG OUT</button>
      </div>
    </div>

    <main></main>
  </section>`);

    const DEFAULT_AVATAR_URL =
      "https://cdn-icons-png.flaticon.com/512/219/219989.png";
    const posts = retrievePosts(context.userId);
    const currentUser = retrieveUser(context.userId);

    const _posts = new Posts(posts, currentUser, DEFAULT_AVATAR_URL);

    _posts.onPostLikeToggled = () => {
      const posts = retrievePosts(context.userId);
      const currentUser = retrieveUser(context.userId);

      _posts.refreshPosts(posts, currentUser, DEFAULT_AVATAR_URL);
    };

    _posts.onPostSaveToggled = () => {
      const posts = retrievePosts(context.userId);
      const currentUser = retrieveUser(context.userId);

      _posts.refreshPosts(posts, currentUser, DEFAULT_AVATAR_URL);
    };

    this.add(_posts);

    this.container.querySelector("main").appendChild(_posts.container);
  }
}
