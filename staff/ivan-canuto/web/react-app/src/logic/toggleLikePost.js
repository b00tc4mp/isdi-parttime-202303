import { savePost, findUserById } from "../data"
import { validateId } from "./helpers/validators"

export const toggleLikePost = (userId, post)=>{
  
  const [user, setUser] = useState()
  
  validateId(userId, 'user id')

  const userPost = Array.from(document.querySelectorAll('.user-post')).find(_post => _post.id === post.id)
  if(!userPost) throw new Error('Post not found')

  findUserById(userId, (_user) => {
    if (!user) {
      callBack(new Error(`User not found.`))

      return
    }

    setUser(_user)
  })
  
  if(!post.likes) 
    post.likes = []

  const likesPost = userPost.querySelector('.likes-post')
  const likedPost = post.likes.some(id => id === userId)
  const likeIcon = userPost.querySelector('.heart-icon')

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