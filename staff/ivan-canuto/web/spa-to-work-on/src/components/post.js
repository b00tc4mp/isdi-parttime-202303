import { Component } from "../library/composito.js";
import { context } from "../ui.js";
import { users } from "../data.js";
import { toggleLikePost } from "../logic/toggle-like-post.js";
import { saveFavoritePost } from "../logic/save-favorite-post.js";
import { selectPost, unselectPost } from "../logic/select-unselect-post.js";
import editPostModal from "../components/edit-post-modal.js"

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

    try {
      const userPost = this.container.querySelector('.user-post')
      const likeIcon = userPost.querySelector('.heart-icon')
      const likesInPost = userPost.querySelector('.likes-post')
      const favoriteIcon = userPost.querySelector('.favorite-icon')
      const popUpWindow = userPost.parentElement.querySelector('.pop-up-window')
      const underImage = userPost.querySelector('.under-image')
      const closePostButton = this.container.querySelector('.close-post-button')
      
      if (context.selected === post.id) selectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
      
      userPost.onclick = function () {
        selectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
        context.selected = post.id
      }
      
      closePostButton.addEventListener('click', ()=>{
        document.body.classList.remove('fixed-scroll')
        unselectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
        delete context.selected
      })

      likeIcon.onclick = () => {
        toggleLikePost(context.userId, context.postId, userPost)

        this.toggleLikeFav()
      }
      
      favoriteIcon.onclick = () => {
        saveFavoritePost(context.userId, context.postId, userPost)
        
        this.toggleLikeFav()
      }

      if (context.userId === post.author) {
        this.container.querySelector('.edit-post-button').onclick = () => {
          const editPost = new editPostModal(userPost, post)
          editPost.removeEditPost = () => this.remove(editPost)
          editPost.refreshPostsFromEdit = () => this.refreshPost()
          this.add(editPost)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  toggleLikeFav() {
    throw new Error('not overriden')
  }
  refreshPost() {
    throw new Error('not overriden')
  }
}