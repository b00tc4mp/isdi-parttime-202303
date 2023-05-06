import Component from "./library/composito.js"
import toggleLikePost from "../logic/toogle-like-post.js"
import { context } from "../ui.js"

export default class Post extends Component {
    constructor(post) {
        super(`<article>
        <img src="${post.image}">
        <p>${post.text}</p>
        <time>${post.date.toLocaleString()}</time>
        <button>${post.likes && post.likes.includes(context.userId) ? '❤️' : '🤍'} ${post.likes? post.likes.length: ''}</button>
        </article>`)

        this.container.querySelector('button').onclick = () => {
            toggleLikePost(context.userId, post.id)

            this.onLikeToggled()
        }
    }

    onLikeToggled(){
        throw new Error("Not overridden")
    }
}