import { savePost, findPostById } from "../data";
import { validateCallback } from "./helpers/validators";


export default function toggleVisibilityPost(postId, callBack) {
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