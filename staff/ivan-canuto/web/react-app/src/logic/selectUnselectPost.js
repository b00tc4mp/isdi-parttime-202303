import { context, addOffClass, removeOffClass } from "../ui";

export const selectPost = (postId)=>{
  const posts = document.querySelectorAll('.user-post')
  let userPost;
  posts.forEach(post => {
    if(post.id === postId) userPost = post
  })
  const likeIcon = userPost.querySelector('.heart-icon')
  const likesInPost = userPost.querySelector('.likes-post')
  const favoriteIcon = userPost.querySelector('.favorite-icon')
  const popUpWindow = userPost.parentElement.querySelector('.pop-up-window')
  const underImage = userPost.querySelector('.under-image')
  
  userPost.classList.add('bigger-post')
  userPost.parentElement.classList.add('selected-post-page')
  removeOffClass(likeIcon, likesInPost, favoriteIcon, popUpWindow)
  underImage.classList.add('under-image-big-post')
  context.postId = userPost.id
}

export const unselectPost = (postId)=>{
  const userPost = Array.from(document.querySelectorAll('.user-post')).find(post => post.id === postId)
  const likeIcon = userPost.querySelector('.heart-icon')
  const likesInPost = userPost.querySelector('.likes-post')
  const favoriteIcon = userPost.querySelector('.favorite-icon')
  const popUpWindow = userPost.parentElement.querySelector('.pop-up-window')
  const underImage = userPost.querySelector('.under-image')

  userPost.classList.remove('bigger-post')
  userPost.parentElement.classList.remove('selected-post-page')
  addOffClass(likeIcon, likesInPost, favoriteIcon, popUpWindow)
  underImage.classList.remove('under-image-big-post')
  delete context.postId
}