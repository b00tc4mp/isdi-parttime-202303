import { findUserById, findPostById, savePost } from "../data"
import { validators } from 'com'

const { validateText, validateCallback } = validators

/**
 * Creates a comment in post.
 * 
 * @param {string} commentText The comment text entered by user.
 * @param {object} userId The user's id.
 * @param {object} postId The post's id.
 * @param {function} callBack A function to catch errors and display them to the user.
 */

export default function createComment(commentText, userId, postId, callBack) {
  validateText(commentText)
  validateCallback(callBack)

  findUserById(userId, (user) => {
    if(!user) {
      callBack(new Error('User not found.'))
  
      return
    }
    
    findPostById(postId, (post) => {  
      let id = 'comment-1'
      const lastComment = post.comments[post.comments.length - 1]
      if (lastComment) id = 'comment-' + (parseInt(lastComment.id.slice(8)) + 1)
      
      post.comments.push({
          author: user.name,
          authorId: user.id,
          text: commentText,
          id
        })

      savePost(post, () => callBack(null))
    })
  })
}