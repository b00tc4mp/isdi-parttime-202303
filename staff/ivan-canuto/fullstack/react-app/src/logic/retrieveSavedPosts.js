import { findUserById, loadPosts, loadUsers } from "../data"
import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Retrieves the saved posts form database.
 * 
 * @param {string} userId The user's id.
 * @param {function} callBack A function to catch errors and display them to the user., and returns the array of saved post by the user.
 * 
*/

export function retrieveSavedPosts(userId, callBack) {
  validateId(userId, 'user id')
  validateCallback(callBack)
  findUserById(userId, (user) => {

    if (!user) {
      alert('User not found.')

      return
    }

    loadUsers(users => {
      loadPosts(posts => {
        const savedPosts = posts.filter(post => user.favs.includes(post.id))
      
        savedPosts.forEach(post => {
          const _user = users.find(user => user.id === post.author)
          
          if(_user) {
            post.author = {
            id: _user.id,
            name: _user.name,
            avatar: _user.avatar,
            favs: _user.favs
            }
          }
        })

        callBack(null, savedPosts.toReversed())
      })
    })
  })
}
