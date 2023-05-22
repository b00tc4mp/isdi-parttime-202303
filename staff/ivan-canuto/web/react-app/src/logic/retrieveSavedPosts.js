import { loadPosts } from "../data"
import { validateCallback, validateId } from "./helpers/validators"
import retrieveUser from "./retrieveUser"

/**
 * Retrieves the saved posts form database
 * 
 * @param {string} userId The user's id
 * @param {function} callBack A function to catch errors and display them to the user., and returns the array of saved post by the user
 * 
*/

export function retrieveSavedPosts(userId, callBack) {
  
  validateId(userId, 'user id')
  validateCallback(callBack)
  
  retrieveUser(userId, (error, user) => {

    if (error) {
      alert(error.message)
      console.log(error.stack)

      return
    }

    loadPosts(posts => {

      let savedPostsApp
      
      if(!user.favs)
        savedPostsApp = []
      else
        savedPostsApp = posts.filter(post => user.favs.includes(post.id))
    
      callBack(null, savedPostsApp.toReversed())
    })
  })
}
