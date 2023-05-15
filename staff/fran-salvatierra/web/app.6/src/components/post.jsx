import { Component } from 'react'
import toggleLikePost from '../logic/toggle-like-post.js'
import { context } from '../ui.js'

export default class Post extends Component {
    constructor(post) {
        super(`<article>
        <img src="${post.image}">
        <p>${post.text}</p>
        <time>${post.date.toLocaleString()}</time>
        <button>${post.likes && post.likes.includes(context.userId) ? '❤️' : '🤍'} (${post.likes? post.likes.length : 0})</button>
    </article>`)

        this.container.querySelector('button').onclick = () => {
            toggleLikePost(context.userId, post.id)

            this.onLikeToggled()
        }
    }

    onLikeToggled() {
        throw new Error('not overridden')
    }
}