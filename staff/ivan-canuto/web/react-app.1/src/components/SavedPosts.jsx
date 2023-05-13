import { context } from "../ui"
import { users } from "../data"
import Post from "./Post"
import { retrievePosts } from "../logic/retrievePosts"

export default function SavedPosts(props) {
  
  function handleRender() {
    props.handleRender()
  }
  
  let postsListClass
  if(props.menuState) postsListClass = 'posts-list open-menu'
  else postsListClass = 'posts-list'
  
  try {
    const posts = retrievePosts(context.userId)
    const _users = users()
    const user = _users.find(user => user.id === context.userId)

    return <section className={postsListClass}>
      {posts.map(post => {
        if(user.favPosts.includes(post.id))
          return <Post key={post.id} post={post} handleRender={handleRender}/>
      })}
    </section>
  } catch (error) {
    alert(error)
    console.log(error.stack);
  }  
}