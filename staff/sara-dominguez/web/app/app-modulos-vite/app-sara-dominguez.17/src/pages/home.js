import Component from "../components/library/composito.js"
import retrievePost from '../logic/retrieve-posts.js'
import Posts from "../components/posts.js"
import { context } from "../ui.js"


export default class Home extends Component {
    constructor() {
        super(`<div class="home">
        <header class="home-header">

           <div class="home-menu">
                <img class="home-header-avatar" src="" alt="">

                <button class="home-menu-myprofile-button"><a href="" class="myProfile">My Profile</a></button>
            </div>
           
        <h3 class="home-header-logout logout" name="logout"><a href="" class="logout">Logout</a></h3>

        </header>
       
        <main></main>

            <footer class="home-footer">
                <button class="add-post-button">+</button>

            </footer>`)

        const posts = retrievePost(context.userId)

        const _posts = new Posts(posts)

        _posts.onPostLikeToggled = () => {
            const posts = retrievePost(context.userId)

            _posts.refreshPosts(posts)

        }
        //no quiero que lo añada debajo del footer sino en el main, por tanto no puedo hacer this.add(_posts)
        this.container.querySelector('main').appendChild(_posts.container)
    }
}
