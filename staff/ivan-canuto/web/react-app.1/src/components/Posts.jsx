import { retrievePosts } from "../logic/retrievePosts";
import Post from "./Post";
import { context } from "../ui";

export default function Posts(props) {

  function handleRender() {
    props.handleRender()
  }

  let postsListClass
  if(props.menuState) postsListClass = 'posts-list open-menu'
  else postsListClass = 'posts-list'

  try {
    const posts = retrievePosts(context.userId)

    return <section className={postsListClass}>
      {posts.map(post => <Post key={post.id} post={post} handleRender={handleRender}/>)}
    </section>
  } catch (error) {
    alert(error)
  }  
}

