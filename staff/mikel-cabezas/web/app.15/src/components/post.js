console.log('Post.js')
import Component from "../library/component.js";
import { returnUserImage } from "../logic/users/get-user-image.js"
import { findUserById } from "../logic/helpers/data-managers.js"
import renderAllUserLikedPost from './helpers/render-all-users-liked-post.js'
import PostLikes from './render-users-liked-post.js'
import { context } from "../ui.js";
import { savePostToFavorites, userLikedPost } from "../logic/posts/posts-data.js";

export default class Post extends Component {
    constructor(post) {
        const userId = context.userId
        const currentUser = findUserById(userId)
        const postDate = post.date
        const now = new Date()
        const difference = now - postDate
        let date
        if (difference < 86400000)
            date = `${Math.ceil(difference / (1000 * 3600))} hours ago`
        if (difference > 86400000) 
            date = `${Math.ceil(difference / (1000 * 3600 * 24))} days ago`

        super(`
        <article class="${post.id}" style="background: linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, rgba(0,0,0,.6) 100%), url(${post.image}) center / cover">
            <div class="user-info"></div>
            <div class="space-image"></div>
            <div class="title-and-interactions">
                <div class="material-symbols-outlined like">favorite</div>
                <div class="material-symbols-outlined comment">maps_ugc</div>
                <div class="material-symbols-outlined save">bookmark</div>
            </div>
            <h3 class="title">${post.title}</h3>
            <p class="excerpt">${post.text}</p>
            <div class="post-likes"></div>
            <div class="comments-count">${post.comments.length} comments</div>
            <time class="post-date">${date}</time>
        </article>`)

        const likePost = this.container.querySelector('.like')
        const favoritePost = this.container.querySelector('.save')

        const authorId = findUserById(post.author)

        returnUserImage(this.container.querySelector('.user-info'), authorId.id, 'showName')
        const postLikes = new PostLikes(post)
        this.container.querySelector('.post-likes').append(postLikes.container)

        const isLikedPost = post.likes.find(user => user === userId)
        const findFavPost = currentUser.likedPosts.find(post => post === post.id)

        if(isLikedPost === userId) this.container.querySelector('.like').classList.add('filled')
        if(findFavPost === post.id) this.container.querySelector('.save').classList.add('filled')

        favoritePost.onclick = () => savePostToFavorites(post, favoritePost, userId)
        likePost.onclick = () => userLikedPost(userId, post, likePost, postLikes)

    }
}
