import { Component } from '../library/composito.js';
import Post from './post.js';
import { context } from '../ui.js';


export default class Posts extends Component {
    constructor(posts) {
        super(`<section></section>`)

        try {
            const posts = retrievePosts(context.userId)
            posts.forEach(post => {
                const _post = new Post(post)
    
                _post.onLikeToggled = () => this.onPostLikeToggled()
    
                this.add(_post)
            })
        } catch (error) {
            alert(error.message)
        }

    }

    onPostLikeToggled() {
        throw new Error('not overridden')
    }

    refreshPosts(posts) {
        this.container.innerHTML = ''

        posts.forEach(post => {
            const _post = new Post(post)

            _post.onLikeToggled = () => this.onPostLikeToggled()

            this.add(_post)
        })
    }
}