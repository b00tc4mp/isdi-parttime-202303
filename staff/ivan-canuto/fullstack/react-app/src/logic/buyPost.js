import { findPostById, savePost } from "../data"
import { validators } from 'com'

const { validateId, validateCallback } = validators

/**
 * Buys the post if other user wants to.
 * 
 * @param {string} postId The post's id.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function buyPost(postId, callBack) {
  validateId(postId)
  validateCallback(callBack)

  findPostById(postId, post => {
    if(!post) {
      callBack(new Error('This post does not exist.'))

      return
    }
    else if(!post.onSale) {
      callBack(new Error('This post is not on sale.'))

      return
    }
    else if(post.onSale === 'Sold') {
      callBack(new Error('This post is already sold.'))

      return
    }
      
    post.onSale = 'Sold'
    
    savePost(post, () => callBack(null))
  })
}