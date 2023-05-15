import { Component } from 'react'
import Post from './post.jsx'

export default class Posts extends Component {
    constructor(posts) {
        super(`<section></section>`)

        posts.forEach(post => {
            const _post = new Post(post)

            _post.onLikeToggled = () => this.onPostLikeToggled()

            this.add(_post)
        })
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