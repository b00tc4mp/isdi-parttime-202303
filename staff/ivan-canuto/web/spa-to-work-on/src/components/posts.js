import { Component } from "../library/composito.js";
import Post from "./post.js";

export default class Posts extends Component {
  constructor(posts) {
    super(`<section class="posts-list"></section>`)

    posts.forEach(post => {
      const _post = new Post(post)

      _post.toggleLike = () => this.onToggleLike()

      this.add(_post)
    })
  }
  
  onToggleLike() {
    throw new Error('not overriden')
  }

  refreshPosts(posts) {
    this.container.innerHTML = ''
    
    posts.forEach(post => {
      const _post = new Post(post)
      
      _post.toggleLike = () => this.onToggleLike()

      this.add(_post)
    })
  }
}