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
            <div class="home__main home--page">
            </div>
            <footer>
                <p class="add-post-anchor"><a class="home__anchor--new-post" href="">Add new post</a></p>
            </footer>
        </div>`)

        if (context.userID) {
            const posts = retrievePosts(context.userID)
            const _posts = new Posts(posts)
            this.container.children[1].append(_posts.container)
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

            this.add(newPost)
            //this.remove(_posts)

            newPost.onPostedOrCanceled = () => {
                //this.add(_posts)
                this.remove(newPost)

                const updatedPosts = retrievePosts(context.userID)
                _posts.refreshPosts(updatedPosts)
            }
        }
        
        this.container.querySelector('.navigation__anchor--logout').onclick = event => {
            event.preventDefault()
        
            context.userID = null
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