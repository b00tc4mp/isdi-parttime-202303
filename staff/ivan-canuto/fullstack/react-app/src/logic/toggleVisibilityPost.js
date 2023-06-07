import { savePost, findPostById } from "../data";
import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Toggles the visibility of the post in public or private.
 * 
 * @param {string} postId The post's id.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function toggleVisibilityPost(postId, callBack) {
  validateId(postId)
  validateCallback(callBack)

  findPostById(postId, post => {
      if (!post) {
        alert('Post not found.')
        console.log('Post not found.');

        return
      }

      post.visible = !post.visible

      savePost(post, () => callBack(null))
      callBack(null, post.visible)
  })
}