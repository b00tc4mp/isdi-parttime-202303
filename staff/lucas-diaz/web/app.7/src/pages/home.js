import Component from "../library/composito.js";
import { context } from "../ui";
import Posts from "../components/posts.js";
import retrieveUser from "../logic/retrieve-user.js";
import AddPostModal from "../components/add-post-modal.js";
import UpdateAvatar from "../components/update-avatar.js";
import UpdatePassword from "../components/update-password.js";


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
                <img class="home-header-user-avatar" src="" alt="default avatar">
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

        const homeMenu = this.container.querySelector(".home-menu");
        const main = this.container.querySelector(".home-posts-content");
        const footer = this.container.querySelector("footer");
        const settingsIcon = this.container.querySelector(".home-header-left-items-config-icon");

        try {
            this.container.querySelector(".home-header-user-avatar").src = retrieveUser(context.userId).avatar
            
            settingsIcon.onclick = () => {
                main.innerHTML = "";
                homeMenu.classList.toggle("home-menu-transition");
            }


            this.container.querySelector(".home-menu-avatar-anchor").onclick = event => {
                event.preventDefault();
                const updateAvatar = new UpdateAvatar
                main.innerHTML = "";
                main.appendChild(updateAvatar.container);
            }

            this.container.querySelector(".home-menu-change-pass-anchor").onclick = event => {
                event.preventDefault();
                console.log("hola")
                const changePassword = new UpdatePassword
                main.innerHTML = "";
                main.appendChild(changePassword.container);
            }


        } catch (error) {
            alert(error.message)
        }

        const posts = new Posts();

        main.appendChild(posts.container);

        this.container.querySelector(".home-header-left-items-log-out-button").onclick = () => {
            delete context.userId

            this.onLoggedOut()
        }

        this.container.querySelector(".footer-button").onclick = () => {
            const addPostModal = new AddPostModal;

            addPostModal.onCancelButton = () => {
                main.classList.remove("fade");
                footer.removeChild(addPostModal.container);
            }

            addPostModal.onPostCreated = () => {
                main.classList.remove("fade");
                footer.removeChild(addPostModal.container);

                posts.renderPosts();
            }

            main.classList.add("fade");
            main.innerHTML = "";
            main.appendChild(posts.container);
            homeMenu.classList.remove("home-menu-transition");
            footer.appendChild(addPostModal.container);

        }

        this.container.querySelector(".home-header-tittle").onclick = () => {
            main.innerHTML = "";
            main.appendChild(posts.container);
            homeMenu.classList.remove("home-menu-transition");
        }
    }

    onLoggedOut() {
        throw new Error("not overridden")
    }
}