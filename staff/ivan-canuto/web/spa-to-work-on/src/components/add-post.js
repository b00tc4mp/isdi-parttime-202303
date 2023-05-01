import { Component } from "../library/composito.js";

export default class AddPost extends Component {
  constructor() {
    super(`<div class="add-post container off">
      <form class="add-post-form">
          <input class="post-url" type="url" name="postImage" placeholder="URL Image" autocomplete="off">
          <textarea class="post-text" name="postText" placeholder="Post text" cols="30" rows="10"></textarea>
          <!-- <input class="post-text" type="text" name="postText" placeholder="Post text"> -->
          <button class="button">Create post</button>
          <button class="cancel-button button" type="button">Canel</button>
      </form>
  </div>`)
    

    // const addPostPage = homePage.querySelector('.add-post')
    // const cancelButton = addPostPage.querySelector('.cancel-button')
    // const addPostForm = homePage.querySelector('.add-post-form')

    this.container.querySelector('.add-post-form').onsubmit = function (e) {
      e.preventDefault()

      let postImageUrl = e.target.postImage.value
      let postText = e.target.postText.value

      try {
        // createPost(context.userId, postImageUrl, postText)
        this.container.querySelector('.add-post-form').reset()
        renderPost()
        this.removeAddPost()

      } catch (error) {
        if (error.name === 'Error') {
          alert(error.message);
        } else {
            alert('Sorry, something went wrong.')
            console.log(error);
        }
      }
    }

    this.container.querySelector('.cancel-button').onclick = function () {
      this.removeAddPost()
      this.container.querySelector('.add-post-form').reset()
      document.body.classList.toggle('fixed-scroll')
    }
  }

  removeAddPost() {
    throw new Error('not overriden.')
  }
}