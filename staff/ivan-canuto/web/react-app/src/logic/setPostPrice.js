import { findPostById, savePost } from "../data";
import { validateId } from "./helpers/validators";


export default function setPostPrice(postId, postPrice, callBack) {

  validateId(postId, 'post id')

  findPostById(postId, (post) => {
    post.onSale = postPrice

    savePost(post, () => callBack(null))
  })

}