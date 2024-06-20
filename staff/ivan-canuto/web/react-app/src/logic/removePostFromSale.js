import { findPostById, savePost } from "../data"


export default function removePostFromSale(postId, callBack) {

  findPostById(postId, (post) => {
    if(!post.onSale || post.onSale === 'Sold') {
      callBack('Sorry, there must be an error')
    }

    post.onSale = null
  
    savePost(post, () => callBack(null))
  })
}