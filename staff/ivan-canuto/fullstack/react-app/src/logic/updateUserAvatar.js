import { saveUser, findUserById } from '../data'
import { validators } from 'com'

const { validateId, validateUrl, validatePassword, validateCallback } = validators

/**
 * Upadtes the user avatar.
 * 
 * @param {string} userId The user's id.
 * @param {string} newAvatarUrl The new avatar url.
 * @param {string} password The users's password.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function updateUserAvatar(userId, newAvatarUrl, password, callBack) {
  validateId(userId, 'user id')
  validateUrl(newAvatarUrl)
  validatePassword(password)
  validateCallback(callBack)
  
  findUserById(userId, (user) => {
    if (!user) {
      callBack(new Error('User not found'))

      return
    }

    if (newAvatarUrl === user.avatar) {
      callBack(new Error('New avatar cannot be the same as the old avatar.'))
      
      return
    }

    if (password !== user.password) {
      callBack(new Error('The password is incorrect'))

      return
    }

    user.avatar = newAvatarUrl
    saveUser(user, () => callBack(null))
  })
}
  