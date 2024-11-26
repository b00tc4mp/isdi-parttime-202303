import Component from "../library/component.js";
import Post from './post.js'

export default class Posts extends Component {
    constructor(posts) {
    
        super(`<section> </section>`)

        posts.forEach(post => {
            const _post = new Post(post)

            this.add(_post)
        })

    }        
}