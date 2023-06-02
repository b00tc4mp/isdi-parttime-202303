import { findPostById, savePost } from "../data"
import { validateCallback, validateId } from "./helpers/validators"


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