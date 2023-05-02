import { Component } from "../library/composito.js";
import { context } from "../ui.js";
import { updatePost } from "../logic/update-post.js"

export default class EditPost extends Component {
  constructor(userPost, post) {
    super(`<div class="edit-post container">
      <form class="edit-post-form">
          <input class="post-url" type="url" name="postImage" placeholder="URL Image">
          <textarea class="post-text" name="postText" placeholder="Post text" cols="30" rows="10"></textarea>
          <button class="button">Edit post</button>
          <button class="cancel-button button" type="button">Canel</button>
      </form>
  </div>`)

    const editPostForm = this.container.querySelector('.edit-post-form')
    editPostForm.querySelector('input').value = post.image
    editPostForm.querySelector('textarea').value = post.text

    editPostForm.addEventListener('submit', (e)=>{
      e.preventDefault()
      context.onsubmit = false

      let postImageUrl = editPostForm.querySelector('input').value
      let postText = editPostForm.querySelector('textarea').value

      try {
        updatePost(context.userId, userPost.id, postImageUrl, postText)
        this.removeEditPost()
        this.refreshPostsFromEdit()
        
      } catch (error) {
        console.log(error);
      }
    })

    this.container.querySelector('.cancel-button').onclick = () => {
      editPostForm.reset()
      this.removeEditPost()
      document.body.classList.toggle('fixed-scroll')
    }
  }
  
  removeEditPost() {
    throw new Error('not overriden')
  }

  refreshPostsFromEdit() {
    throw new Error('not overriden')
  }
}