import { context } from "../ui";
import { posts } from "../data";
import { users } from "../data";
import { savePosts } from "../data";
import { saveUser } from "../data";


export default function deletePost() {

  const _users = users()
  const user = _users.find(user => user.id === context.userId)
  const _posts = posts()
  const userPost = _posts.find(post => post.id === context.postId)
  const postIndex = _posts.indexOf(userPost)
  const favPostIndex = user.favPosts.indexOf(context.postId)
  
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