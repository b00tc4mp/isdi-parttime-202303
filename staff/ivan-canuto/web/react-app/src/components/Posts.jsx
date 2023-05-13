import { retrievePosts } from "../logic/retrievePosts";
import Post from "./Post";
import { context } from "../ui";
import { useState } from "react";

export default function Posts(props) {

  let _posts;

  try {
    _posts = retrievePosts(context.userId)
    
  } catch(error) {
    alert(error)
    console.log(error.stack);
  }

  const [posts, setPosts] = useState(_posts)

  const renderPosts = () => {
    try {
      _posts = retrievePosts(context.userId)
      setPosts(_posts)

    } catch(error) {
      alert(error)
      console.log(error);
    }
  }

  try {
    const posts = retrievePosts(context.userId)

    return <section className="posts-list">
    {posts.map(post => <Post key={post.id} post={post} handleOpenEditPost={props.handleOpenEditPost} handleRender={renderPosts}/>)}
    </section>
  } catch (error) {
    alert(error)
  }  
}

