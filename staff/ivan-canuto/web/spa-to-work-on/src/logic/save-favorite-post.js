import { saveUser } from '../data.js'
import { findUserById } from './helpers/data-manager.js'

export const saveFavoritePost = (userId, postId, renderedPost)=>{
  const user = findUserById(userId)
  const favIcon = renderedPost.querySelector('.favorite-icon')

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