import { context } from "../ui";
import { posts } from "../data";
import { users } from "../data";
import { savePosts } from "../data";
import { saveUser } from "../data";

/**
 * Deletes a user's post
 * 
 * @param {object} post The post's object from database
 * @param {string} userId The user's id
 */

export default function deletePost(post, userId) {

  const _users = users()
  const user = _users.find(user => user.id === userId)
  const userPost = post
  const _posts = posts()
  const postIndex = _posts.indexOf(userPost)
  const favPostIndex = user.favPosts.indexOf(post.id)
  
  try {
    _posts.splice(postIndex, 1)

    if(favPostIndex >= 0)
      user.favPosts.splice(favPostIndex, 1)

    savePosts(_posts)
    saveUser(user)
    
  } catch(error) {
    alert('Sorry, there must be an error.')
    console.log(error.stack);
  }
}