import { findUserById, loadUsers, savePost } from "../data"
import { context } from "../ui"
import { v4 as uuidv4 } from 'uuid';
import { validateText } from "./helpers/validators";

/**
 * Creates a comment in post
 * 
 * @param {string} commentText The comment text entered by user
 * @param {object} post The post's object form database
 */

export default function createComment(commentText, post, callBack) {
  validateText(commentText)

  findUserById(context.userId, (user) => {

    if(!user) {
      callBack(new Error('User not found.'))
  
      return
    }
      
        const _post = post
      
        if(!_post.comments) _post.comments = []
      
        _post.comments.push({
          author: user.name,
          authorId: user.id,
          text: commentText,
          id: uuidv4()
        })
        savePost(_post, () => callBack(null))
    
  })
}