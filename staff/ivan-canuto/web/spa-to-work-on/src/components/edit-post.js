import { Component } from "../library/composito.js";
import { posts } from "../data.js";
import { context } from "../ui.js";

export default class EditPost extends Component {
  constructor() {
    super(`<div class="edit-post container">
      <form class="edit-post-form">
          <input class="post-url" type="url" name="postImage" placeholder="URL Image">
          <textarea class="post-text" name="postText" placeholder="Post text" cols="30" rows="10"></textarea>
          <button class="button">Edit post</button>
          <button class="cancel-button button" type="button">Canel</button>
      </form>
  </div>`)

    const editPostForm = this.container.querySelector('.edit-post-form')
    
    const post = posts().find(post => post.id === userPost.id)
    context.postId = userPost.id
    this.addEditPost()
    removeOffClass(editPostPage)
    editPostForm.querySelector('input').value = post.image
    editPostForm.querySelector('textarea').value = post.text

    editPostForm.addEventListener('submit', (e)=>{
      e.preventDefault()
      context.onsubmit = false

      let postImageUrl = editPostForm.querySelector('input').value
      let postText = editPostForm.querySelector('textarea').value

      try {
        // updatePost(userId, userPost.id, postImageUrl, postText)
        this.removeEditPost()
        addOffClass(editPostPage)
        // selectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
        // renderPosts()
        
      } catch (error) {
        alert(error.message)
      }
    })

    editPostPage.querySelector('.cancel-button').onclick = function () {
      editPostForm.reset()
      addOffClass(editPostPage)
      document.body.classList.toggle('fixed-scroll')
    }
  }
  
  removeEditPost() {
    throw new Error('not overriden')
  }

  addEditPost() {
    throw new Error('not overriden')
  }
}