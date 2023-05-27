import { findUserById, loadPosts, savePosts, saveUser } from "../data";
import { validateCallback, validateId } from "./helpers/validators";

/**
 * Deletes a user's post
 * 
 * @param {object} post The post's object from database
 * @param {string} userId The user's id
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function deletePost(postId, userId, callBack) {

  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateCallback(callBack)

  findUserById(userId, (user) => {

    if(!user) {
      callBack(new Error('User not found.'))

      return
    }

    const favPostIndex = user.favs.indexOf(postId)

    if(favPostIndex >= 0) {
      user.favs.splice(favPostIndex, 1)
      saveUser(user, () => callBack(null))
    }

    loadPosts(posts => {

      const userPost = posts.find(post => post.id === postId)

      const postIndex = posts.indexOf(userPost)
      posts.splice(postIndex, 1)
      
      savePosts(posts, () => callBack(null))
    })
  })
}