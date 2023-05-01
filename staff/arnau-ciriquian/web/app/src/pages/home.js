import Component from "../library/composito.js";
import Posts from "../components/posts.js";
import retrievePosts from "../logic/retrive-posts.js";
import { context } from "../ui.js";
import NewPost from "../components/new-post.js";

export default class Home extends Component {
    constructor() {
        super(`<div class="home">
            <header class="home__navigation">
                <nav class="home__navigation--profile">
                    <img class="avatar" src="images/space-dog.svg">
                    <p class="text"><a class="home__anchor--profile" href="">Profile</a></p>
                </nav>
                <div>
                    <a class="navigation__anchor--logout" href=""><img class="anchor__logout--icon" src="images/rocket-launch.svg"></a>
                </div>
            </header>
            <footer>
                <p class="add-post-anchor"><a class="home__anchor--new-post" href="">Add new post</a></p>
            </footer>
        </div>`)

        if (context.userID) {
            const posts = retrievePosts(context.userID)
            const _posts = new Posts(posts)
            this.add(_posts)

            //retriveUser i aplicar per queryselector el parametres del nom al anchor i l'avatar
            //+ llogica per entrar al profile (onclick) 20230501 2110
        }

        this.container.querySelector('.home__anchor--new-post').onclick = event => {
            event.preventDefault()
        
            //hideAllPasswords(loginPage, '.login__password')
            //unslashAllEyes(loginPage, '.login-eye')
        
            this.onNewPost()
        }

        let newPost

        this.onNewPost = () => {
            newPost = new NewPost
            this.container.removeChild(this.container.children[2])
            this.add(newPost)

            //newPost.onPosted = newPost.onCanceled = () -> crida en cadena
            newPost.onPostedOrCanceled = () => {
                this.remove(newPost)

                const posts = retrievePosts(context.userID)
                const _posts = new Posts(posts)
                this.add(_posts)
            }
        }
        
        this.container.querySelector('.navigation__anchor--logout').onclick = event => {
            event.preventDefault()
        
            sessionStorage.removeItem('userID')
            document.querySelector('.home__post--feed').innerHTML = ''

            this.onLoggedOut()
        }
    }

    onNewPost() {
        throw new Error('not overriden')
    }

    onLoggedOut() {
        throw new Error('not overriden')
    }
}