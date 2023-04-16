import { context } from "../ui.js";
import { createdPosts } from "../pages/home-page.js";

export const selectPost = (postId)=>{
  let postToSelect;
  const allPosts = createdPosts.querySelectorAll('.user-post')
  allPosts.forEach(post => {
    if(post.id === postId) postToSelect = post
  })
  postToSelect.classList.add('bigger-post')
  postToSelect.parentElement.classList.add('selected-post-page')
  postToSelect.parentElement.querySelector('.pop-up-window').classList.remove('off')
  context.postId = postId
}

export const unselectPost = (postId)=>{
  let postToUnselect;
  const allPosts = createdPosts.querySelectorAll('.user-post')
  allPosts.forEach(post => {
    if(post.id === postId) postToUnselect = post
  })
  if(!postToUnselect) throw new Error('Post not found')
  postToUnselect.classList.remove('bigger-post')
  postToUnselect.parentElement.classList.remove('selected-post-page')
  postToUnselect.parentElement.querySelector('.pop-up-window').classList.add('off')
  context.postId = null
}