import { findUserById } from "../data";
import { validateId } from "./helpers/validators";

/**
 * Retrieves the name, avatar, and favorite posts of the user
 * 
 * @param {string} userId The user's id
 * 
 * @returns {object} The new user's object
 */

export default function retrieveUser(userId, callBack) {
  validateId(userId, 'user id')

  findUserById(userId, (user) => {
    if(!user) {
      callBack(new Error('User not found.'))

      return
    }
    
     const _user = {
      name: user.name,
      avatar: user.avatar,
      favPosts: user.favPosts
    }
  
    callBack(null, _user)
  })
}