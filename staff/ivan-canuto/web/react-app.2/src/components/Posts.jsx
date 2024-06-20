import { retrievePosts } from "../logic/retrievePosts";
import Post from "./Post";
import { context } from "../ui";
import { useState, useEffect } from "react";
import { retrieveSavedPosts } from "../logic/retrieveSavedPosts";
import { retrieveUserPosts } from "../logic/retrieveUserPosts";
import './components-styles/Posts.css'


export default function Posts({ handleOpenEditPost, lastPostsUpdate, view }) {

  let _posts;
  
  try {
    if(view === 'posts') {
      _posts = retrievePosts(context.userId)
      context.view = 'posts'

    } else if(view === 'savedPosts') {
      _posts = retrieveSavedPosts(context.userId)
      context.view = 'savedPosts'

    } else if(view === 'userPosts') {
      _posts = retrieveUserPosts(context.userId)
      context.view = 'userPosts'
    }
    
  } catch(error) {
    alert(error)
    console.log(error.stack);
  }

  const [posts, setPosts] = useState(_posts)

  const refreshPosts = () => {
    try {
      let posts;

      if(view === 'posts')
        posts = retrievePosts(context.userId)

      else if(view === 'savedPosts')
        posts = retrieveSavedPosts(context.userId)

      else if(view === 'userPosts')
        posts = retrieveUserPosts(context.userId)

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

    if(lastPostsUpdate || view) 
      refreshPosts()
      
  }, [lastPostsUpdate, view])

  return <section className="posts-list">
    {posts.map(post => <Post key={post.id} post={post} handleOpenEditPost={handleOpenEditPost} handleRefreshPosts={refreshPosts}/>)}
  </section>
}

