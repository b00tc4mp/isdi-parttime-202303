import Component from '../library/composito.js'
import retrievePosts from '../logic/retrieve-posts.js'
import { context } from '../ui.js'
import Posts from '../components/posts.js'
import { findUserById } from '../logic/helpers/data-managers.js'

export default class Home extends Component {
    constructor() {
        super(`    <div class="home-page">
        
        <header>
            <div name="my-app"><a href="#"><i class="uil uil-scenery"></i><span></span></a></div>
            <nav>
                <ul class="horizontal-menu">
                        <li name="home"><a href="#" class="menu-buttons"><i class="uil uil-home"></i><span class="menu-text">Home</span></a></li>
                        <li name="new-post"><a href="#" class="menu-buttons"><i class="uil uil-camera-plus"></i><span class="menu-text">Post</span></a></li>
                        <li name="my-profile">
                            <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="" class="user-avatar">
                            <a href="#" class="menu-buttons"><span class="menu-text" name="authenticated-user-name">Profile</span></a>
                        </li>
                        <li class="logout" name="logout"><a href="#" class="menu-buttons"><i class="uil uil-signout"></i><span class="menu-text">Logout</span></a></li>
                </ul>
            </nav>
        </header>

        <main class="post-list">
        </main>

    </div>`)

        const user = findUserById(context.userId)

        if(user.avatar)
            this.container.querySelector('.user-avatar').src = user.avatar

        const posts = retrievePosts(context.userId)

        const _posts = new Posts(posts)

        _posts.onPostLikeToggled = () => {
            const posts = retrievePosts(context.userId)

            _posts.refreshPosts(posts)
        }

        this.container.querySelector('main').appendChild(_posts.container)
    }
}