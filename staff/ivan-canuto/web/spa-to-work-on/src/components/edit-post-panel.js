import { updatePost } from "../logic/update-post.js"
import { renderPost } from "../logic/render-post.js"
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
  unselectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
  context.postId = userPost.id
  removeOffClass(editPostPage)
  editPostForm.querySelector('input').value = post.image
  editPostForm.querySelector('textarea').value = post.text

  editPostForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    let postImageUrl = editPostForm.querySelector('input').value
    let postText = editPostForm.querySelector('textarea').value

    try {
      updatePost(userId, userPost.id, postImageUrl, postText)
      renderPost()
      addOffClass(editPostPage)
      selectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
      
    } catch (error) {
      alert(error.message)
    }
  })

  editPostPage.querySelector('.cancel-button').onclick = function () {
    homePage.querySelector('.edit-post-form').reset()
    addOffClass(editPostPage)
    selectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
  }
}