import { Component } from '../library/composito.js';
import  retrievePosts  from '../logic/retrieve-posts.js';
import  Posts  from '../components/posts.js'
import { context } from '../ui.js';

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

        <main>TODO show list</main>

        <footer class="home-footer">
            <button class="add-post-button">+</button>
        </footer>
    </div>`);
        debugger
        const posts = retrievePosts(context.userId);
        const _posts = new Posts(posts)

        this.container.querySelector('main').appendChild(_posts.container);
    }
}