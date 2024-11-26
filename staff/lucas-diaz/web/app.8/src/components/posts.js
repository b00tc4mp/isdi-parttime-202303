import Component from "../library/composito";
import retrievePosts from "../logic/retrieve-posts";
import { context } from "../ui";
import Post from "./post";


export default class Posts extends Component {
    constructor() {
        super(`<section class="home-posts-content"></section>`)

        this.renderPosts();
    }

    renderPosts() {
        try {
            this.container.innerHTML = "";
            const posts = retrievePosts(context.userId);

            posts.forEach( post => {
                const _post = new Post(post);

                _post.onLikeToggled = () => this.renderPosts();

                this.add(_post);
            })

        } catch (error) {
            alert(error.message)
        }
    }
}