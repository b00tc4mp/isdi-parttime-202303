import { Component } from "../library/composito.js";
import Posts from "../components/posts.js";
import { context } from "../ui.js";
import retrieveUser from "../logic/retrieve-user.js";

export default class Home extends Component {
  constructor() {
    super(`<section class="home">
    <div class="home-header">
      <h1 class="home-title title">HOME</h1>

      <div class="home-header-nav">
        <img class="avatar home-header-avatar" src="" alt="" />
        <a href="" class="profile-link"></a>

        <button class="button profile-logout-button">LOG OUT</button>
      </div>
    </div>
    <div class="button-new-post-container">
    <button class="button new-post-button">NEW POST</button>
    </div>

    <main class='posts-container'></main>
  </section>`);

    const DEFAULT_AVATAR_URL =
      "https://cdn-icons-png.flaticon.com/512/219/219989.png";
    const currentUser = retrieveUser(context.userId);

    this.container.querySelector(".avatar").src = currentUser.avatar
      ? currentUser.avatar
      : DEFAULT_AVATAR_URL;

    this.container.querySelector("a").innerText = currentUser.name;

    const posts = new Posts(DEFAULT_AVATAR_URL);

    const main = this.container.querySelector("main");

    this.container.querySelector(".profile-logout-button").onclick = () => {
      context.removeItem("userId");

      this.onLogout();
    };

    main.appendChild(posts.container);
  }

  onLogout() {
    throw new Error("Not overridden");
  }
}
