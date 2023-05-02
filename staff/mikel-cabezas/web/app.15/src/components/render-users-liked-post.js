console.log('RederUserLikes.js')
import Component from "../library/component.js";
import renderAllUserLikedPost from "./helpers/render-all-users-liked-post.js";
import { returnUserImage } from "../logic/users/get-user-image.js";

import Post from './post.js'

export default class PostLikes extends Component {
    constructor(post) {
        super(`
        <div class="likes">
            <div class="total-likes-post"></div>
            <div class="users-liked-post">
                </div>
            </div>
        </div>
        `)

        const totalUsersLikedPost = this.container.querySelector('.total-likes-post')
        const usersLikedPost = this.container.querySelector('.users-liked-post')

        if (post.likes.length === 1) {
            totalUsersLikedPost.innerText = post.likes.length + ' like'
        }
        if (post.likes.length > 1) {
            totalUsersLikedPost.innerText = post.likes.length + ' likes'
        }

        if (post.likes.length >= 1) {
            for(let i = 0; i < post.likes.length; i++) {
                if(i < 6) {
                    const userId = post.likes[i]
                    returnUserImage(totalUsersLikedPost, userId)
                }
            }
            totalUsersLikedPost.onclick = function(event) {
                event.preventDefault()
                event.stopPropagation()
                renderAllUserLikedPost(this.parentElement, post)
            }
        }

        return this
    }
}