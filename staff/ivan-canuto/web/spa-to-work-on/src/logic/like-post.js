import { likedPostsId, saveLikedPost, savePosts } from "../data.js"


export const likePost = (userId, postId, post)=>{
  let likesUser = likedPostsId.find(userLikes => userLikes[0] === userId)
  if (likesUser === undefined) {
    likedPostsId.push([userId])
    likesUser = [userId]
  }

  let index;
  for (let i = 0; i < likedPostsId.length; i++) {
    if(likedPostsId[i][0] === userId) index = i
  }

  const icon = post.querySelector('.icon-svg')
  const likesPost= post.querySelector('.likes-post')
  if (!icon.classList.contains('red-bg')) {
    icon.classList.add('red-bg')
    likesPost.textContent = (parseInt(likesPost.textContent[0]) + 1) + ' likes'
    likedPostsId[index].push(postId)
  } else {
    icon.classList.remove('red-bg')
    likesPost.textContent = (parseInt(likesPost.textContent[0]) - 1) + ' likes'
    const indexPostId = likedPostsId[index].indexOf(postId)
    likedPostsId[index].splice(indexPostId, 1)
  }
  saveLikedPost()
  savePosts()
}