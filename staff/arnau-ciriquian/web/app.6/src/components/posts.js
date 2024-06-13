import Component from "../library/composito";
import Post from "./post";
import { context } from "../ui";

export default class Posts extends Component {
    constructor(posts) {
        super(`<div class="home__post--feed">        
                </div>`)

        posts.forEach(post => {
            const _post = new Post(post)

            if (post.author !== context.userID) {
                const editButtonContainer = _post.container.children[2]
                const editButton = _post.container.children[2].children[4]
                editButtonContainer.removeChild(editButton)
            }

            this.add(_post)
        });
    }

    refreshPosts(posts) {
        this.container.innerHTML = ''

        posts.forEach(post => {
            const _post = new Post(post)

            this.add(_post)
        })

        //this.add(posts)
    }
}