import { loadPosts, findUserById, loadUsers } from "../data"
import { validateCallback, validateId } from "./helpers/validators"

/**
 * Retrieves the posts form database
 * 
 * @param {string} userId The user's id
 * @param {function} callBack A function to catch errors and display them to the user., and returns the posts array required
 * 
*/

export function retrievePosts(userId, callBack) {

  validateId(userId, 'user id')
  validateCallback(callBack)

  findUserById(userId, (user) => {

    if (!user) {
      callBack(new Error(`User with ${userId} not found.`))

      return
    }

    loadUsers(users => {
      loadPosts(posts => {
        
        posts.forEach(post => {

          const _user = users.find(user => user.id === post.author)
            
          if(_user) {
            post.author = {
              id: _user.id,
              name: _user.name,
              avatar: _user.avatar,
              favs: _user.favs
            }
          }
          // console.log(post);
        })

        callBack(null, posts.toReversed())
      })
    })
    
  })
}
