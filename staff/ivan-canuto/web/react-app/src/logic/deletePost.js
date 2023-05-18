import { findUserById, loadPosts, savePosts } from "../data";
import { validateId } from "./helpers/validators";

/**
 * Deletes a user's post
 * 
 * @param {object} post The post's object from database
 * @param {string} userId The user's id
 */

export default function deletePost(post, userId, callBack) {

  validateId(userId, 'user id')

  findUserById(userId, (user) => {

    if(!user) {
      callBack(new Error('User not found.'))

      return
    }

    const favPostIndex = user.favPosts.indexOf(post.id)

    if(favPostIndex >= 0)
      user.favPosts.splice(favPostIndex, 1)

    loadPosts(posts => {

      const userPost = post

      const postIndex = posts.indexOf(userPost)
      posts.splice(postIndex, 1)
      
      savePosts(posts, () => callBack(null))
    })
    saveUser(user, () => callBack(null))
  })
}