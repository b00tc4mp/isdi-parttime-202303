import { likedPostsId } from "../data.js";
import { createdPosts } from "../pages/home-page.js";
import { context } from "../ui.js";

export const renderLikes = ()=>{
  const allPostsIcons = createdPosts.querySelectorAll('svg')
  const allPosts = createdPosts.querySelectorAll('.user-post')
  allPostsIcons.forEach(post => post.classList.remove('red-bg'))
  
    // Get likes quantity form each post
    allPosts.forEach(post => {
      for (let i = 0; i < likedPostsId.length; i++) {
        for (let j = 0; j < likedPostsId[i].length; j++) {
          if (post.id === likedPostsId[i][j]) {
            post.querySelector('.likes-post').textContent = (parseInt(post.querySelector('.likes-post').textContent[0]) + 1) + ' likes'
          }
        }
      }
    })

  // Get liked posts by user
  let index;
  for (let i = 0; i < likedPostsId.length; i++) {
    if(likedPostsId[i][0] === context.userId) index = i
  }
  if(index === undefined) return;

  // Get liked icons from posts
  allPosts.forEach(post => {
    for (let i = 1; i <likedPostsId[index].length; i++) {
      if (post.id === likedPostsId[index][i]) {
        post.querySelector('svg').classList.add('red-bg')
      }
    }
  })
}
   