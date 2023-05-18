import { validateText, validateUrl, validateId } from "./helpers/validators"
import { loadPosts, savePost, findUserById } from "../data"

export const updatePost = (userId, postId, postImageUrl, postText)=>{

  validateId(userId, 'user id')
  validateId(postId, 'post id')
  validateUrl(postImageUrl)
  validateText(postText)
  
  findUserById(userId, (user) => {
    if (!user) {
      callBack(new Error(`User not found.`))
      
      return
    }

    loadPosts(posts => {

      let post = posts.find(post => post.id === postId)

      if (!post) {
        callBack(new Error(`Post with id ${postId} not found`))

        return
      }
    
      if (post.author !== userId) {
        callBack(new Error('There must be an error, this user is not the owner of the post.'))

        return
      }
    
      post.text = postText
      post.image = postImageUrl
    
      savePost(post, () => callBack(null))
    })

  })

}