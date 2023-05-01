import Component from '../library/composito.js'
import Post from './post.js'
import { findUserById } from '../logic/helpers/data-managers.js'

export default class Posts extends Component {
    constructor(posts) {
        super(`<section></section>`)

        posts.forEach(post => {
            const user = findUserById(post.author)

            const _post = new Post(post, user)

            _post.onLikeToggled = () => this.onPostLikeToggled()

            this.add(_post)
        })
    }

    onPostLikeToggled() {
        throw new Error('Not overriden')
    }

    refreshPosts(posts) {
        this.container.innerHTML = ''

        posts.forEach(post => {
             const user = findUserById(post.author)

             const _post = new Post(post, user)

             _post.onLikeToggled = () => this.onPostLikeToggled()

             this.add(_post)
        })
    }
}