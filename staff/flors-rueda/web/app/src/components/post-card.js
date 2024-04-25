import { Component } from '../library/mew.js'
import { context } from '../ui/general-tools.js'
import { renderPostBody, renderPostFooter, renderPostHeader } from './helpers/post-card.js'

export default class Post extends Component {
    constructor(post) {
        super(`<article class="post-card">${renderPostHeader(post, context.userAuth) + 
            renderPostBody(post, context.userAuth) + 
            renderPostFooter(post, context.userAuth)}</article>`)

        /*
        this.container.querySelector('button').onclick = () => {
            toggleLikePost(context.userId, post.id)

            this.onLikeToggled()
        }*/
    }
    /*
    onLikeToggled() {
        throw new Error('not overridden')
    }*/
}