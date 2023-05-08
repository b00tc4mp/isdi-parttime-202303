import { Component } from "../library/composito.js";
import Posts from "../components/posts.js";
import { context } from "../ui.js";
import { users } from "../data.js";
import addPostModal from "../components/add-post-modal.js"
import Profile from "../components/profile-modal.js";

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

    try {
      const main = this.container.querySelector('main')
      const user = users().find(user => user.id === context.userId)
      this.container.querySelector('.avatar-image').src = user.avatar
      this.container.querySelector('a').innerHTML = user.name
      
      const _posts = new Posts
      
      main.appendChild(_posts.container)

      this.container.querySelector('.add-post-button').onclick = () => {
        const addPost = new addPostModal
        document.body.classList.add('fixed-scroll')

        addPost.refreshPosts = () => _posts.renderPosts()
        addPost.removeAddPost = () => main.removeChild(addPost.container)

        main.appendChild(addPost.container)
      }
      
      this.container.querySelector('.name-avatar-profile').onclick = () => {
        const profile = new Profile
        document.body.classList.toggle('fixed-scroll')

        profile.removeProfile = () => this.remove(profile)
        profile.changeAvatarImage = () => this.container.querySelector('.avatar-image').value = user.avatar

        this.add(profile)
      }

      this.container.querySelector('.logout-button').onclick = () => {
        this.returnLogin()
        delete context.userId
      }

    }catch (error) {
      console.log(error);
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