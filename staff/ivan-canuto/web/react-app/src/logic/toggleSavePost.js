import { saveUser, findUserById } from '../data'
import { validateCallback, validateId } from './helpers/validators';

/**
 * Saves the favorite posts from user
 * 
 * @param {string} userId The user's id
 * @param {object} post The post's object
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function toggleSavePost(userId, post, callBack) {

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

    if(!user.favs.includes(post.id)) {
      favIcon.querySelector('span').classList.add('saved', 'filled')
      user.favs.push(post.id)
    } else {
      favIcon.querySelector('span').classList.remove('saved', 'filled')
      const indexIcon = user.favs.indexOf(post.id)
      user.favs.splice(indexIcon, 1)
    }

    saveUser(user, () => callBack(null))
  })
}