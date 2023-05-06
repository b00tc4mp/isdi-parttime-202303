import Component from "../library/composito.js";
import { context } from "../ui";
import Posts from "../components/posts.js";
import retrieveUser from "../logic/retrieve-user.js";


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
                <img class="home-header-user-avatar" src="${retrieveUser(context.userId).avatar} "https://img.icons8.com/color/512/avatar.png"}" alt="default avatar">
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

        const posts = new Posts();
        this.container.querySelector(".home-posts-content").appendChild(posts.container);

        this.container.querySelector(".home-header-left-items-log-out-button").onclick = () => {
            delete context.userId

            this.onLoggedOut()
        }
    }

    onLoggedOut() {
        throw new Error("not overridden")
    }
}