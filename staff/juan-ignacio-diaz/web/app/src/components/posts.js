import { Component } from '../library/composito.js'
import Post from './post.js'

export default class Posts extends Component {
    constructor(posts) {
        super(`<section></section>`)

        posts.forEach(post => {
            const tmpPost = new Post(post)

            tmpPost.onLikeToggled = () => this.OnPostLikeToggled()
            tmpPost.onSaveToggled = () => this.OnPostsaveToggled()

            this.add(tmpPost)
        });
    }

    onPostLikeToggled() {
        throw new Error('not overridden')
    }

    onPostSaveToggled() {
        throw new Error('not overridden')
    }

    refreshPosts(posts) {
        this.container.innerHTML = ''

        posts.forEach(post => {
            const tmpPost = new Post(post)

            tmpPost.onLikeToggled = () => this.onPostLikeToggled()
            tmpPost.onSaveToggled = () => this.onPostSaveToggled()

            this.add(tmpPost)
        })
    }
}