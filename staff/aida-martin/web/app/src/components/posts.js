import { Component } from "../library/composito.js";
import Post from "./post.js";
import retrievePosts from "../logic/retrieve-posts.js";
import retrieveUser from "../logic/retrieve-user.js";
import { context } from "../ui.js";

export default class Posts extends Component {
  constructor(defaultAvatar) {
    super(`<section class="posts-list"></section>`);

    this.renderPosts(defaultAvatar);
  }

  renderPosts(defaultAvatar) {
    this.container.innerHTML = "";

    try {
      const posts = retrievePosts(context.userId);
      const user = retrieveUser(context.userId);

      posts.forEach((post) => {
        const _post = new Post(post, user, defaultAvatar);

        _post.onLikeToggled = () => {
          this.renderPosts(user, defaultAvatar);
        };

        _post.onSaveToggled = () => {
          this.renderPosts(user, defaultAvatar);
        };

        this.add(_post);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
