import { findPostById, savePost } from "../data"
import { validateCallback, validateId } from "./helpers/validators"


export default function buyPost(postId, callBack) {
  validateId(postId)
  validateCallback(callBack)

  findPostById(postId, post => {
    if(!post)
      callBack(new Error('This post does not exist.'))
    else if(!post.onSale)
      callBack(new Error('This post is not on sale.'))
    else if(post.onSale === 'Sold')
      callBack(new Error('This post is already sold.'))
      
    post.onSale = 'Sold'
    
    savePost(post, () => callBack(null))
  })
}