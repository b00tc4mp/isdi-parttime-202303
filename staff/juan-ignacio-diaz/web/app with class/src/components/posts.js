import { Component } from '../library/composito.js'
import { context } from '../ui.js'
import { msAlert } from '../pages/alert-page.js'

import Post from './post.js'
import retrievePosts from "../logic/retrieve-posts.js"

export default class Posts extends Component {
    constructor(posts) {
        super(`<section></section>`)

        this.renderPosts()
    }

    renderPosts() {
        this.container.innerHTML = ''

        try {
            const posts = retrievePosts(context.userId)

            posts.forEach(post => {
                const tmpPost = new Post(post)

                tmpPost.onLikeToggled = () => this.renderPosts()
                tmpPost.onSaveToggled = () => this.renderPosts()
                tmpPost.onEditPost = () => this.onEditPost(post.id)

                this.add(tmpPost)
            })
        } catch(error) {         
            msAlert(error.message)
        }
    }

    onEditPost(postId) {
        throw new Error('not overridden')
    }
}