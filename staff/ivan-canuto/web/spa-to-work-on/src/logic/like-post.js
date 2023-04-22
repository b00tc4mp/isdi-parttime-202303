import { posts, savePosts } from "../data.js"
import { findUserById } from "./helpers/data-manager.js"
import { validateId } from "./helpers/validators.js"
import { renderPost } from "./render-post.js"

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

  if (!likedPost) {
    icon.innerHTML = ''
    icon.textContent = '❤️'
    likesPost.textContent = (parseInt(likesPost.textContent[0]) + 1) + ' likes'
    post.likes.push(userId)
  } else {
    icon.textContent = ''
    icon.innerHTML = `<svg class="like-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4454 20.7608L3.57617 12.5663C1.35964 10.2582 1.49922 6.4736 3.87922 4.34929C6.24035 2.24181 9.82044 2.65105 11.6863 5.24171L12 5.67724L12.3137 5.24171C14.1796 2.65105 17.7596 2.24181 20.1208 4.34929C22.5008 6.4736 22.6404 10.2582 20.4238 12.5663L12.5546 20.7608C12.2483 21.0797 11.7517 21.0797 11.4454 20.7608Z" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
    likesPost.textContent = (parseInt(likesPost.textContent[0]) - 1) + ' likes'
    let indexUserId = post.likes.indexOf(userId)
    post.likes.splice(indexUserId, 1)
  }
  savePosts(postsApp)
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