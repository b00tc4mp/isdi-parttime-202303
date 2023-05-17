import { loadPosts } from "../data"
import { validateId } from "./helpers/validators"
import retrieveUser from "./retrieveUser"

/**
 * Retrieves the saved posts form database
 * 
 * @param {string} userId The user's id
 * 
 * @returns {array} The array of saved posts
*/

export function retrieveSavedPosts(userId, callBack) {
  
  validateId(userId, 'user id')
  
  retrieveUser(userId, (user) => {

    loadPosts(posts => {

      let savedPostsApp
      
      if(!user.favPosts)
        savedPostsApp = []
      else
        savedPostsApp = posts.filter(post => user.favPosts.includes(post.id))
    
      callBack(null, savedPostsApp.toReversed())
    })
  })
}
