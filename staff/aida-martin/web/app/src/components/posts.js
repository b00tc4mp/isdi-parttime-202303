import { Component } from "../library/composito.js";
import Post from "./post.js";
import retrieveUser from "../logic/retrieve-user.js";
import { context } from "../ui.js";

export default class Posts extends Component {
  constructor(posts, defaultAvatar) {
    super(`<section class="posts-list"></section>`);

    posts.forEach((post) => {
      const user = retrieveUser(post.author);
      const currentUser = retrieveUser(context.userId);

      const _post = new Post(post, user, currentUser, defaultAvatar);

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

  refreshPosts(posts) {
    this.container.innerHTML = "";

    posts.forEach((post, defaultAvatar) => {
      const user = retrieveUser(post.author);
      const currentUser = retrieveUser(context.userId);

      const _post = new Post(post, user, currentUser, defaultAvatar);

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
