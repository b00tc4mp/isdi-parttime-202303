import { findPostById, savePost } from "../data"

/**
 * Remove post from sale state
 * 
 * @param {string} postId The post's id
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function removePostFromSale(postId, callBack) {

  findPostById(postId, (post) => {
    if(!post.onSale || post.onSale === 'Sold') {
      callBack('Sorry, there must be an error')

      return
    }

    post.onSale = null
  
    savePost(post, () => callBack(null))
  })
}