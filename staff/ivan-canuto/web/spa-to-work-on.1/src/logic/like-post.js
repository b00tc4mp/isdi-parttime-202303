import { posts, savePost } from "../data.js"
import { findUserById } from "./helpers/data-manager.js"
import { validateId } from "./helpers/validators.js"

export const likePost = (userId, postId, renderedPost)=>{
  const postsApp = posts()
  validateId(userId, 'user id')
  let user = findUserById(userId)
  if(!user) throw new Error(`User with ${userId} not found`)

  validateId(postId, 'post id')
  const post = postsApp.find(post => post.id === postId)
  if(post === undefined) throw new Error('There must be an error, post not found')

  const icon = renderedPost.querySelector('.heart-icon')
  const likesPost = renderedPost.querySelector('.likes-post')

  const likedPost = post.likes.some(id => id === userId)
  const likeIcon = renderedPost.querySelector('.heart-icon')

  if (!likedPost) {
    likeIcon.querySelector('span').classList.add('liked', 'filled')
    likesPost.textContent = (parseInt(likesPost.textContent[0]) + 1) + ' likes'
    post.likes.push(userId)
  } else {
    likeIcon.querySelector('span').classList.remove('liked', 'filled')
    likesPost.textContent = (parseInt(likesPost.textContent[0]) - 1) + ' likes'
    let indexUserId = post.likes.indexOf(userId)
    post.likes.splice(indexUserId, 1)
  }

  savePost(post)
}


// export const likePost = (userId, postId, post)=>{
//   let likesUser = likedPostsId.find(userLikes => userLikes[0] === userId)
//   if (likesUser === undefined) {
//     likedPostsId.push([userId])
//     likesUser = [userId]
//   }

//   let index;
//   for (let i = 0; i < likedPostsId.length; i++) {
//     if(likedPostsId[i][0] === userId) index = i
//   }

//   const icon = post.querySelector('.icon-svg')
//   const likesPost= post.querySelector('.likes-post')
//   if (!icon.classList.contains('red-bg')) {
//     icon.classList.add('red-bg')
//     likesPost.textContent = (parseInt(likesPost.textContent[0]) + 1) + ' likes'
//     likedPostsId[index].push(postId)
//   } else {
//     icon.classList.remove('red-bg')
//     likesPost.textContent = (parseInt(likesPost.textContent[0]) - 1) + ' likes'
//     const indexPostId = likedPostsId[index].indexOf(postId)
//     likedPostsId[index].splice(indexPostId, 1)
//   }
//   saveLikedPost()
//   savePosts()
// }