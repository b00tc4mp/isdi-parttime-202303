import { Component } from '../library/composito.js'
import { context } from '../ui.js'
import { msAlert } from '../pages/alert-page.js'

import retrieveUser from "../logic/retrieve-user.js"
import toggleLikePost from '../logic/toggle-like-post.js'
import toggleSavePost from "../logic/toggle-save-post.js"

export default class Post extends Component {
    constructor(post) {    
        super(`<article class="post-article post-text">
    <div class="post-Author">
        <h1 class="name"></h1>
    </div>
    <div class = "post-menssage">
        <img src="${post.image}" class="post-image">
        <p>${post.text}</p>
    </div>
    <button class = "button-likes">${post.likes && post.likes.includes(context.userId) ? '❤️' : '🤍'} (${post.likes? post.likes.length : 0})</button>
    <button class = "button-save"></button>
    <div class = "post-info">
        <time>Date ${post.date.toLocaleString()}</time>
        <button>Edit</button>
        <time>${post.dateLastModified ? 'Last Modified ' + post.dateLastModified.toLocaleString(): ''}</time>
    </div>
</article>`)

        try {
            const activeUser = retrieveUser(context.userId)
            const postUser = retrieveUser(post.author)

            this.container.querySelector('.post-Author').querySelector('.name').innerText = postUser.name
            this.container.querySelector('.button-save').innerText= activeUser.savePosts && activeUser.savePosts.includes(post.id)? 'Saved' : 'Unsaved'

            const postInfo = this.container.querySelector('.post-info')

            if(postUser.id !== activeUser.id) 
                postInfo.removeChild(postInfo.querySelector('button')) 
            else 
                postInfo.querySelector('button').onclikck = () => {this.onEditPost(post.id)}
        } catch(error) {         
            msAlert(error.message)
        }

        this.container.querySelector('.button-likes').onclikck = () => {
alert('p')            
            toggleLikePost(context.userId, post.id)

            this.onLikeToggled()
        }

        this.container.querySelector('.button-save').onclikck = () => {
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

    onEditPost(postId) {
        throw new Error('not overridden')
    }
} 