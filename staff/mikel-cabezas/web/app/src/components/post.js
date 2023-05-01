import Component from "../library/component";
import { returnUserImage } from "../logic/users/get-user-image"

export default class Post extends Component {
    constructor(post) {
        super(`
        <article class="${post.id}" style="background: linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, rgba(0,0,0,.6) 100%), url(${post.image}) center / cover">
            <div class="space-image"></div>
            <div class="title-and-interactions">
                <div class="material-symbols-outlined like filled">favorite</div>
                <div class="material-symbols-outlined comment">maps_ugc</div>
                <div class="material-symbols-outlined save">bookmark</div>
            </div>
            <h3 class="title">${post.title}</h3>
            <p class="excerpt">${post.text}</p>
            <div class="total-likes-post">${post.likes.length} likes
                <div class="users-liked-post">
                    <div class="post-author" title="Miquel Cabezas">
                        <div class="avatar">
                            <div class="letter">MC</div>
                            <img class="image-profile hidden"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="comments-count">${post.comments.length} comments</div>
            <time class="post-date">${post.date.toLocaleString('en-GB', { timeZone: 'UTC' })}</time>
        </article>`)


    }
}