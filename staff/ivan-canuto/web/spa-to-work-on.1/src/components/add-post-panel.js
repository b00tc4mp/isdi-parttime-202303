import { createPost } from "../logic/create-post.js";
import { renderPosts } from "../logic/render-posts.js";
import { context, addOffClass } from "../ui.js";

export default function initAddPostPanel (homePage) {
  const addPostPage = homePage.querySelector('.add-post')
  const cancelButton = addPostPage.querySelector('.cancel-button')
  const addPostForm = homePage.querySelector('.add-post-form')

  addPostForm.onsubmit = function (e) {
    e.preventDefault()

    let postImageUrl = e.target.postImage.value
    let postText = e.target.postText.value

    try {
      createPost(context.userId, postImageUrl, postText)
      addOffClass(addPostPage)
      addPostForm.reset()
      renderPosts()

    } catch (error) {
      if (error.name === 'Error') {
        alert(error.message);
      } else {
          alert('Sorry, something went wrong.')
          console.log(error);
      }
    }
  }

  cancelButton.onclick = function () {
    addOffClass(addPostPage)
    addPostForm.reset()
    document.body.classList.toggle('fixed-scroll')
  }

  return addPostPage
}