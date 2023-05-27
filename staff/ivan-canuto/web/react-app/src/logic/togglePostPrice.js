import { findPostById, savePost } from "../data";
import { validateId } from "./helpers/validators";


export function setPostPrice(postId, postPrice, callBack) {

  validateId(postId, 'post id')

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