import { findUserById } from "../data";
import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Retrieves the name, avatar, and favorite posts of the user.
 * 
 * @param {string} userId The user's id.
 * @param {function} callBack A function to catch errors and display them to the user., and returns the user information required.
 * 
 */

export default function retrieveUser(userId, callBack) {
  validateId(userId, 'user id')
  validateCallback(callBack)

  findUserById(userId, (user) => {
    if(!user) {
      callBack(new Error('User not found.'))

      return
    }
    
     const _user = {
      name: user.name,
      avatar: user.avatar,
      favs: user.favs
    }

    callBack(null, _user)
  })
}