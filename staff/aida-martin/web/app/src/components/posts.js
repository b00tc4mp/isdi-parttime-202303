import { Component } from "../library/composito.js";
import Post from "./post.js";

export default class Posts extends Component {
  constructor(posts, currentUser, defaultAvatar) {
    super(`<section class="posts-list"></section>`);

    posts.forEach((post) => {
      const _post = new Post(post, currentUser, defaultAvatar);

      _post.onLikeToggled = () => {
        this.onPostLikeToggled();
      };

      _post.onSaveToggled = () => {
        this.onPostSaveToggled();
      };

      this.add(_post);
    });
  }

  onPostLikeToggled() {
    throw new Error("Not overriden");
  }

  onPostSaveToggled() {
    throw new Error("Not overriden");
  }

  refreshPosts(posts, currentUser, defaultAvatar) {
    this.container.innerHTML = "";

    posts.forEach((post) => {
      const _post = new Post(post, currentUser, defaultAvatar);

      _post.onLikeToggled = () => {
        this.onPostLikeToggled();
      };

      _post.onSaveToggled = () => {
        this.onPostSaveToggled();
      };

      this.add(_post);
    });
  }
}
