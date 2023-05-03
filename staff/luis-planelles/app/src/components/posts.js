import { Component } from '../library/composito.js';
import retrievePosts from '../logic/retrieve-posts.js';
import { context } from '../ui.js';
import Post from './post.js';

class Posts extends Component {
  constructor() {
    super(`<section></section>`);

    this.renderPosts();
  }

  renderPosts() {
    this.container.innerHTML = '';

    try {
      const posts = retrievePosts(context.userId);

      posts.forEach((post) => {
        const _post = new Post(post);

        _post.onLikeToggled = () => this.renderPosts();

        this.add(_post);
      });
    } catch (error) {
      alert(error.message);
    }
  }
}

export default Posts;
