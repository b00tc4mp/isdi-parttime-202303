import { Component } from "../library/composito.js";
import { context } from "../ui.js";
import { users } from "../data.js";
import { toggleLikePost } from "../logic/toggle-like-post.js";
import { selectPost } from "../logic/select-unselect-post.js";
import { unselectPost } from "../logic/select-unselect-post.js";

export default class Post extends Component {
  constructor(post) {
    const user = users().find(user => user.id === context.userId)
    super(`<div>
        <article class="user-post" id="${post.id}">
          <img class="image-post" src=${post.image}>
          <div class="under-image">
            <i class="favorite-icon off">${(user.favPosts.includes(post.id))? `<span class="material-symbols-outlined saved filled">star</span>` : `<span class="material-symbols-outlined">star</span>`}</i>
            <i class="heart-icon off">${(post.likes.includes(context.userId))? `<span class="material-symbols-outlined filled liked">favorite</span>` : `<span class="material-symbols-outlined">favorite</span>`}</i>
            <p class="likes-post off">${post.likes.length + ' likes'}</p>
            <p class="date-post">${post.date}</p>
          </div>
          <p class="text-post">${post.text}</p>
        </article>
        <div class="pop-up-window off">
          ${(post.author === user.id)? `<button class="edit-post-button">Edit post</button>` : '' }
          <button class="close-post-button">Clsose</button>
        </div>
      </div>`
    )

    const userPost = this.container.querySelector('.user-post')
    const likeIcon = userPost.querySelector('.heart-icon')
    const likesInPost = userPost.querySelector('.likes-post')
    const favoriteIcon = userPost.querySelector('.favorite-icon')
    const popUpWindow = userPost.parentElement.querySelector('.pop-up-window')
    const underImage = userPost.querySelector('.under-image')
    const closePostButton = this.container.querySelector('.close-post-button')
    
    
    userPost.onclick = function () {
      selectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
    }
    
    closePostButton.addEventListener('click', ()=>{
      document.body.classList.remove('fixed-scroll')
      unselectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
    })

    likeIcon.onclick = () => {
      toggleLikePost(context.userId, context.postId, userPost)

      this.toggleLike()
    }
    // likeIcon.onclick = function () {likePost(context.userId, context.postId, userPost)}
    favoriteIcon.onclick = function () {saveFavoritePost(context.userId, context.postId, userPost)}

    if (context.userId === post.author) {
      const editPostButton = this.container.querySelector('.edit-post-button')
      const editPostPage = this.container.querySelector('.edit-post')
      const editPostForm = this.container.querySelector('.edit-post-form')
      editPostButton.onclick = function () {
        // initEditPostPanel(userPost, post.author, editPostPage, editPostForm)
      }
    }
  }

  toggleLike() {
    throw new Error('not overriden')
  }
}