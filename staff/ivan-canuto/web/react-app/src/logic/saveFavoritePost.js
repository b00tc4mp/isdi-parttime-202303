import { saveUser, findUserById } from '../data'

/**
 * Saves the favorite posts from user
 * 
 * @param {string} userId The user's id
 * @param {object} post The post's object
 */

export const saveFavoritePost = (userId, post)=>{
  const userPost = Array.from(document.querySelectorAll('.user-post')).find(_post => _post.id === post.id)
  const user = findUserById(userId)
  const favIcon = userPost.querySelector('.favorite-icon')

  if(!user.favPosts) 
    user.favPosts = []
  
  if(!user.favPosts.includes(post.id)) {
    favIcon.querySelector('span').classList.add('saved', 'filled')
    user.favPosts.push(post.id)
  } else {
    favIcon.querySelector('span').classList.remove('saved', 'filled')
    const indexIcon = user.favPosts.indexOf(post.id)
    user.favPosts.splice(indexIcon, 1)
  }
  saveUser(user)
}