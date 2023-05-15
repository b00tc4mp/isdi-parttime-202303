import { retrievePosts } from "../logic/retrievePosts";
import Post from "./Post";
import { context } from "../ui";
import { useState, useEffect } from "react";

export default function Posts({ handleOpenEditPost, lastPostsUpdate }) {

  let _posts;
  
  try {
    _posts = retrievePosts(context.userId)
    
  } catch(error) {
    alert(error)
    console.log(error.stack);
  }

  const [posts, setPosts] = useState(_posts)

  const refreshPosts = () => {
    try {
      const posts = retrievePosts(context.userId)
      setPosts(posts)

    } catch(error) {
      alert(error)
      console.log(error);
    }
  }

  useEffect(() => {
    console.log('Posts -> "ComponentDidMount" with hooks.');

    return () => console.log('Posts -> "ComponentWillUnmount" with hooks.');
  }, [])

  useEffect(() => {
    console.log('Posts -> "ComponentWillRecieveProps" with hooks.');

    if(lastPostsUpdate) 
      refreshPosts()
      
  }, [lastPostsUpdate])

    return <section className="posts-list">
    {posts.map(post => <Post key={post.id} post={post} handleOpenEditPost={handleOpenEditPost} handleRefreshPosts={refreshPosts}/>)}
    </section>
}

