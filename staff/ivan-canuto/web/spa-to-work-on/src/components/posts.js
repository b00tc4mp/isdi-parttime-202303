import { Component } from "../library/composito.js";
import { retrievePosts } from "../logic/retrieve-posts.js";
import Post from "./post.js";
import { context } from "../ui.js";

export default class Posts extends Component {
  constructor(main) {
    super(`<section class="posts-list"></section>`)

    this.renderPosts()
  }

  renderPosts() {
    this.container.innerHTML = ''

    try {
      const posts = retrievePosts(context.userId)
      
      posts.forEach(post => {
        const _post = new Post(post)
        
        _post.toggleLikeFav = _post.refreshPost = () => this.renderPosts()
        
        this.add(_post)
      })
    } catch (error) {
      console.log(error);
    }
  }

}



//     posts.forEach(post => {
//       const _post = new Post(post)

//       _post.toggleLikeFav = () => {
//         const posts = retrievePosts(context.userId)

//         this.refreshPosts(posts)
//       }

//       this.add(_post)
//     })
//   }

//   refreshPosts(posts) {
//     this.container.innerHTML = ''
    
//     posts.forEach(post => {
//       const _post = new Post(post)
      
//       _post.toggleLikeFav = () => this.onToggleLikeFav()

//       this.add(_post)
//     })
//   }
// }