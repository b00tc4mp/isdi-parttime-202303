import Component from "../library/composito";
import Post from "./post";


export default class Posts extends Component{
    constructor(posts){
        super(`<section class="home-posts-content "></section>`)

        posts.forEach((post) => {
            const _post = new Post(post);

            _post.onLikePost = () => {
                this.onPostLike()
            }

            this.add(_post);
        })
    }

    onPostLike() {
        throw new Error ("not overridden")
    }

    refreshPosts(posts){
        this.container.innetHTML = "";

        posts.forEach((post) => {
            const _post = new Post(post);

            _post.onLikePost = () => {
                this.onPostLike()
            }

            this.add(_post);
        })
    }
}