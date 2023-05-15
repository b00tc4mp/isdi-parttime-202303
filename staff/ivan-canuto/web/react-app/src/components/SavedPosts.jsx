import { context } from "../ui"
import { users } from "../data"
import Post from "./Post"
import { retrievePosts } from "../logic/retrievePosts"

export default function SavedPosts(props) {
  
  const handleRender = () => {
    props.handleRender()
  }
  
  try {
    const posts = retrievePosts(context.userId)
    // RetreiveSavedPost -> crear esta funció que te devuelva los posts favoritos
    const _users = users()
    const user = _users.find(user => user.id === context.userId)

    return <section className='posts-list'>
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