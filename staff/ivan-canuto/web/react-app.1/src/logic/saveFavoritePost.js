import { saveUser } from '../data'
import { findUserById } from './helpers/dataManager'

export const saveFavoritePost = (userId, postId)=>{
  const userPost = Array.from(document.querySelectorAll('.user-post')).find(post => post.id === postId)

  const user = findUserById(userId)
  const favIcon = userPost.querySelector('.favorite-icon')

  if(!user.favPosts.includes(postId)) {
    favIcon.querySelector('span').classList.add('saved', 'filled')
    user.favPosts.push(postId)
  } else {
    favIcon.querySelector('span').classList.remove('saved', 'filled')
    const indexIcon = user.favPosts.indexOf(postId)
    user.favPosts.splice(indexIcon, 1)
  }
  saveUser(user)
}