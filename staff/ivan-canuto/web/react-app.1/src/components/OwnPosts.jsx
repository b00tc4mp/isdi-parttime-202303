import { context } from "../ui"
import Post from "./Post"
import { retrievePosts } from "../logic/retrievePosts"

export default function OwnPosts(props) {
  
  function handleRender() {
    props.handleRender()
  }

  let postsListClass
  if(props.menuState) postsListClass = 'posts-list open-menu'
  else postsListClass = 'posts-list'

  try {
    const posts = retrievePosts(context.userId)

    return <section className={postsListClass}>
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