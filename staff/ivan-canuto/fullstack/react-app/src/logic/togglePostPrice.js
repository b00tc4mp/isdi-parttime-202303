import { findPostById, savePost } from "../data";
import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Sets the post price.
 * 
 * @param {string} postId The post's id.
 * @param {string} postPrice The post's price.
 * @param {string} callBack A function to catch errors and display them to the user.
 */

export function setPostPrice(postId, postPrice, callBack) {
  validateId(postId, 'post id')
  validateCallback(callBack)

  findPostById(postId, (post) => {
    if(!post) {
      callBack(new Error('Sorry, the post does not exist.'))

      return
    }

    post.onSale = postPrice

    savePost(post, () => callBack(null))
  })

}

export function unsetPostPrice(postId, callBack) {

  findPostById(postId, post => {
    if(!post) {
      callBack(new Error('Sorry, the post does not exist.'))

      return
    }

    post.onSale = null
    
    savePost(post, () => callBack(null))
  })
}