import Component from "../library/composito.js";
import retrievePosts from "../logic/retrieve-posts.js";
import { context } from "../ui";
import Posts from "../components/posts.js";


export default class Home extends Component {
    constructor() {
        super(`
        <div class="home">

            <header class="home-header">
            <h1 class="home-header-tittle">Home</h1>
                <div class="home-header-left-items">
                    <img class="home-header-left-items-config-icon" src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png" alt="">
                    <button class="home-header-left-items-log-out-button button">Log out</button>
                </div>
            <div class="home-header-user">
                <img class="home-header-user-avatar" src=""
                    alt="default avatar">
                <h2 class="home-header-user-welcome-msj"></h2>
            </div>
            <nav class="home-menu">
                <ul>
                    <li><a href="" class="home-menu-change-pass-anchor">change password</a></li>
                    <li><a href="" class="home-menu-avatar-anchor">Avatar</a></li>
                    <li><a href="" class="home-menu-option3">option 3</a></li>
                </ul>
            </nav>
            </header>


            <main class="home-posts-content">
            </main>

            <footer class="footer">
                <button class="footer-button button"> + </button>
            </footer>
        </div>
        
    `)

        const posts = retrievePosts(context.userId);
        const _posts = new Posts(posts);


        _posts.onPostLikeToggled = () => {
            const posts = retrievePosts(context.userId);

            _posts.refreshPosts(posts)
        }

        this.container.querySelector(".home-posts-content").appendChild(_posts.container);
    }
}