import { saveUser, findUserById } from '../data'
import { validateCallback, validateId } from './helpers/validators';

/**
 * Saves the favorite posts from user
 * 
 * @param {string} userId The user's id
 * @param {object} post The post's object
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export const saveFavoritePost = (userId, post, callBack)=>{

  validateId(userId, 'user id')
  validateCallback(callBack)

  const userPost = Array.from(document.querySelectorAll('.user-post')).find(_post => _post.id === post.id)
  
  findUserById(userId, (_user) => {
    if (!_user) {
      callBack(new Error(`User with ${userId} not found.`))

      return
    }

    let user = _user

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

    saveUser(user, () => callBack(null))
  })
}