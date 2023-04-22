import { selectPost, unselectPost } from "../logic/select-unselect-post.js"
import { context } from "../ui.js"
import { homePage } from "../pages/home-page.js"
import initEditPostPanel from "./edit-post-panel.js"
import { likePost } from "../logic/like-post.js"
import { saveFavoritePost } from "../logic/save-favorite-post.js"


export default function initUserPostPanel (userPost, post) {

  const likeIcon = userPost.querySelector('.heart-icon')
  const likesInPost = userPost.querySelector('.likes-post')
  const favoriteIcon = userPost.querySelector('.favorite-icon')
  const popUpWindow = userPost.parentElement.querySelector('.pop-up-window')
  const underImage = userPost.querySelector('.under-image')
  const closePostButton = popUpWindow.querySelector('.close-post-button')
  
  selectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
  
  closePostButton.addEventListener('click', ()=>{
    unselectPost(userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)
  })

  likeIcon.onclick = function () {likePost(context.userId, context.postId, userPost)}
  favoriteIcon.onclick = function () {saveFavoritePost(context.userId, context.postId, userPost)}

  if (context.userId === post.author) {
    const editPostButton = popUpWindow.querySelector('.edit-post-button')
    const editPostPage = homePage.querySelector('.edit-post')
    const editPostForm = homePage.querySelector('.edit-post-form')
    editPostButton.onclick = function () {
      initEditPostPanel(userPost, post.author, editPostPage, editPostForm)
    }
  }
}