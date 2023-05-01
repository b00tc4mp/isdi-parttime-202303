import { Component } from '../library/composito.js'
import { context } from '../ui.js'

import retrieveUser from "../logic/retrieve-user.js"
import toggleLikePost from '../logic/toggle-like-post.js'
import toggleSavePost from "../logic/toggle-save-post.js"

export default class Post extends Component {
    constructor(post) {
        const activeUser = retrieveUser(context.userId)

        super(`<article class="post-article post-text">
    <div class="post-Author">
        <h1 class="name">${retrieveUser(post.author).name}</h1>
    </div>
    <div class = "post-menssage">
        <img src="${post.image}" class="post-image">
        <p>${post.text}</p>
    </div>
    <button class = "buttom-likes">${post.likes && post.likes.includes(context.userId) ? '❤️' : '🤍'} (${post.likes? post.likes.length : 0})</button>
    <button class = "buttom-save">${activeUser.savePosts && activeUser.savePosts.includes(post.id)? 'Saved' : 'Unsaved'}</button>
    <div class = "post-info">
        <time>Date ${post.date.toLocaleString()}</time>
        <time>${post.dateLastModified ? 'Last Modified ' + post.dateLastModified.toLocaleString(): ''}</time>
    </div>
</article>`)
 
        this.container.querySelector('.buttom-likes').onclikck = () => {
            toggleLikePost(context.userId, post.id)

            this.onLikeToggled()
        }

        this.container.querySelector('.buttom-save').onclikck = () => {
            toggleSavePost(context.userId, post.id)

            this.onSaveToggled()
        }
    }

    onLikeToggled() {
        throw new Error('not overridden')
    }

    onSaveToggled() {
        throw new Error('not overridden')
    }
} 