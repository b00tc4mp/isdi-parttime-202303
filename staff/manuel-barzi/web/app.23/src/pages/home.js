import { Component } from '../library/composito.js'
import Posts from '../components/posts.js'
import { context } from '../ui.js'
import retrieveUser from '../logic/retrieve-user.js'
import AddPostModal from '../components/add-post-modal.js'
import Profile from '../components/profile.js'

export default class Home extends Component {
    constructor() {
        super(`<div class="home">
        <header class="home-header">
            <h1 class="title">Home</h1>

            <nav class="home-header-nav">
                <img class="home-header-avatar" src="" alt="">
                <a href="">Profile</a>
            </nav>
            
            <button class="home-header-logout">Logout</button>
        </header>

        <main></main>

        <footer class="home-footer">
            <button class="add-post-button">+</button>
        </footer>
    </div>`)

        let profile

        try {
            const user = retrieveUser(context.userId)

            this.container.querySelector('img').src = user.avatar

            const profileLink = this.container.querySelector('a')

            profileLink.innerText = user.name

            profileLink.onclick = event => {
                event.preventDefault()

                profile = new Profile

                main.removeChild(posts.container)
                main.appendChild(profile.container)
            }
        } catch (error) {
            alert(error.message)
        }

        const posts = new Posts

        const main = this.container.querySelector('main')

        main.appendChild(posts.container)

        this.container.querySelector('.home-header-logout').onclick = () => {
            delete context.userId

            this.onLoggedOut()
        }

        this.container.querySelector('.add-post-button').onclick = () => {
            const addPostModal = new AddPostModal

            addPostModal.onCancel = () => main.removeChild(addPostModal.container)

            addPostModal.onPostCreated = () => {
                main.removeChild(addPostModal.container)

                posts.renderPosts()
            }

            main.appendChild(addPostModal.container)
        }

        this.container.querySelector('h1').onclick = () => {
            main.removeChild(profile.container)
            main.appendChild(posts.container)
        }
    }

    onLoggedOut() {
        throw new Error('not overridden')
    }
}