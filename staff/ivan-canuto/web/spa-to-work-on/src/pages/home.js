import { Component } from "../library/composito.js";
import { retrievePosts } from "../logic/retrieve-posts.js";
import Posts from "../components/posts.js";
import { context } from "../ui.js";

export default class Home extends Component {
  constructor() {
    super(`<div class="home page">
        <header class="header">
            <h1 class="title">Home</h1>
            <div class="name-avatar-profile">
                <img class="avatar-image" src="" alt="avatar image">
                <a>profile</a>
            </div>
            <button class="logout-button">Logout</button>
        </header>

        <main></main>

        <footer class="home-footer">
            <button class="add-post-button">+</button>
        </footer>
    </div>`)

      const posts = retrievePosts(context.userId)
  
      const _posts = new Posts(posts)

      this.container.querySelector('main').appendChild(_posts.container)

      _posts.onToggleLike = () => {
        const posts = retrievePosts(context.userId)

        _posts.refreshPosts(posts)
      }

    this.container.querySelector('.add-post-button').onclick = () => {
      this.showAddPost()
      // removeOffClass(addPostPanel)
      // document.body.classList.toggle('fixed-scroll')
    }
    
    this.container.querySelector('.name-avatar-profile').onclick = function () {
      this.showProfile()
      // removeOffClass(profilePanel)
      // document.body.classList.toggle('fixed-scroll')
    }

    this.container.querySelector('.logout-button').onclick = function () {
      this.returnLogin()
      // addOffClass(homePage)
      // removeOffClass(loginPage)
      // delete context.userId
    }
  }

  showAddPost() {
    throw new Error('not overriden')
  }
  
  showProfile() {
    throw new Error('not overriden')
  }

  returnLogin() {
    throw new Error('not overriden')
  }
}