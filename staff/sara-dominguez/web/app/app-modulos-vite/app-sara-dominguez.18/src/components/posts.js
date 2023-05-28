import Component from './library/composito.js'
import Post from './post.js'
import retrievePost from '../logic/retrieve-posts.js'
import { context } from "../ui.js"

export default class Posts extends Component {
    constructor(){
        super(`<section></section>`)

        this.renderPosts()
    }

        renderPosts() {
            this.container.innerHTML = ''

        try {
            const posts = retrievePost(context.userId)
            
            posts.forEach(post=> {
                const _post = new Post(post)

                _post.onLikeToggled = () => this.renderPosts()//recursividad asincrona(toggle)
            
                this.add(_post)
            })
        } catch (error) {
            throw new Error(message.error)
        }
    }
}