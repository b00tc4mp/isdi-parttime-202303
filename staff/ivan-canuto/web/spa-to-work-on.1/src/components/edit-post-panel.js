import { updatePost } from "../logic/update-post.js"
import { renderPosts } from "../logic/render-posts.js"
import { addOffClass, removeOffClass, context } from "../ui.js"
import { selectPost, unselectPost } from "../logic/select-unselect-post.js"
import { posts } from "../data.js"
import { homePage } from "../pages/home-page.js"

export default function initEditPostPanel (userPost, userId, editPostPage, editPostForm) {
  const likeIcon = userPost.querySelector('.heart-icon')
  const likesInPost = userPost.querySelector('.likes-post')
  const favoriteIcon = userPost.querySelector('.favorite-icon')
  const popUpWindow = userPost.parentElement.querySelector('.pop-up-window')
  const underImage = userPost.querySelector('.under-image')
  
  const post = posts().find(post => post.id === userPost.id)
  context.postId = userPost.id
  removeOffClass(editPostPage)
  editPostForm.querySelector('input').value = post.image
  editPostForm.querySelector('textarea').value = post.text

  editPostForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    context.onsubmit = false

    let postImageUrl = editPostForm.querySelector('input').value
    let postText = editPostForm.querySelector('textarea').value

    try {
      updatePost(userId, userPost.id, postImageUrl, postText)
      addOffClass(editPostPage)
      // selectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
      renderPosts()
      context.onsubmit = true
      
    } catch (error) {
      alert(error.message)
    }
  })

  editPostPage.querySelector('.cancel-button').onclick = function () {
    homePage.querySelector('.edit-post-form').reset()
    addOffClass(editPostPage)
    document.body.classList.toggle('fixed-scroll')
  }
}