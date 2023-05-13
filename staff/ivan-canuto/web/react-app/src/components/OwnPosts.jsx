import { context } from "../ui"
import Post from "./Post"
import { retrievePosts } from "../logic/retrievePosts"

export default function OwnPosts(props) {
  
  const handleRender = () => {
    props.handleRender()
  }

  try {
    const posts = retrievePosts(context.userId)

    return <section className='posts-list'>
      {posts.map(post => {
        if(post.author === context.userId) {
          return <Post key={post.id} post={post} handleRender={handleRender}/>
        }
      })}
    </section>
  } catch (error) {
    alert(error)
    console.log(error.stack);
  }  
}