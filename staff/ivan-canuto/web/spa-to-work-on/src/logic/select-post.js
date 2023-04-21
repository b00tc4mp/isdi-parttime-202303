import { context, removeOffClass, addOffClass } from "../ui.js";

export const selectPost = (userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)=>{
  
  userPost.classList.add('bigger-post')
  userPost.parentElement.classList.add('selected-post-page')
  removeOffClass(likeIcon, likesInPost, favoriteIcon, popUpWindow)
  underImage.classList.add('under-image-big-post')
  context.postId = userPost.id
}

export const unselectPost = (userPost, likeIcon, likesInPost, favoriteIcon, popUpWindow, underImage)=>{
  
  userPost.classList.remove('bigger-post')
  userPost.parentElement.classList.remove('selected-post-page')
  addOffClass(likeIcon, likesInPost, favoriteIcon, popUpWindow)
  underImage.classList.remove('under-image-big-post')
  delete context.postId
}