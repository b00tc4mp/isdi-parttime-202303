import Component from '../library/composito.js'
import toggleLikePost from '../logic/toggle-like-post.js'
import { context } from '../ui.js'

export default class Post extends Component {
    constructor(post, user) {
        super(`<article class="post-container">
        <div class="post-header">
        <img src="${user.avatar}" class="user-avatar">
        <p class="author-name">${user.name}</p>
        <time></time>
        <button class="edit-button off"><i class="uil uil-edit"></i></button>
        </div>
        <img src="${post.image}">
        <button class="like-button"><i class="uil uil-heart-sign"></i></button>
        <p class="likes-counter"></p>
        <div><p class="author-name">${user.name}</p><p>${post.text}</p></div>
        </article>`)
        
        const day = post.date.getDate().toString().padStart(2, '0')
        const month = (post.date.getMonth() + 1).toString().padStart(2, '0')
        const year = post.date.getFullYear()

        this.container.querySelector('time').innerText = `· ${day}/${month}/${year}`

        if(post.author === context.userId)
            this.container.querySelector('.edit-button').classList.remove('off')

        if(post.likedBy.includes(context.userId))
            this.container.querySelector('.like-button').classList.add('liked')

        if(post.likedBy.length > 1){
            this.container.querySelector('.likes-counter').innerText = `${post.likedBy.length} likes`
        } else if (post.likedBy.length > 0){
            this.container.querySelector('.likes-counter').innerText = `${post.likedBy.length} like`
        }

        this.container.querySelector('.like-button').onclick = () => {
            try {
                toggleLikePost(context.userId, post.id)
    
                this.onLikeToggled()
            } catch(error) {
                alert(error.message)
            }
        }
    }

    onLikeToggled() {
        throw new Error('not overriden')
    }
}