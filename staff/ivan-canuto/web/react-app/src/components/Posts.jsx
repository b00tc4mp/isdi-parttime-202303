import { retrievePosts } from "../logic/retrievePosts";
import Post from "./Post";
import { context } from "../ui";
import { useState, useEffect } from "react";
import { retrieveSavedPosts } from "../logic/retrieveSavedPosts";
import { retrieveUserPosts } from "../logic/retrieveUserPosts";
import './components-styles/Posts.css'
import { findUserById } from "../data";


export default function Posts({ handleOpenEditPost, lastPostsUpdate, view }) {

  const [posts, setPosts] = useState()
  const [user, setUser] = useState()
  
  useEffect(() => {
    try {
      if(view === 'posts')
        retrievePosts(context.userId, (error, _posts) => {
          if (error) {
            alert(error.message)
            console.log(error)

            return
          }

          setPosts(_posts)
        })

      else if(view === 'savedPosts')
        retrieveSavedPosts(context.userId, (error, _posts) => {
          if (error) {
            alert(error.message)
            console.log(error)

            return
          }

          setPosts(_posts)
        })

      else if(view === 'userPosts')
        retrieveUserPosts(context.userId, (error, _posts) => {
          if (error) {
            alert(error.message)
            console.log(error)

            return
          }

          setPosts(_posts)
        })

        findUserById(context.userId, (_user) => {
  
          if(!_user) {
            throw new Error('User not found.')
          }
      
          setUser(_user)
        })
      
    } catch(error) {
      alert(error)
      console.log(error.stack);
    }
  }, [])


  const refreshPosts = () => {
    try {

      if(view === 'posts')
        retrievePosts(context.userId, (error, _posts) => {
          if (error) {
            alert(error.message)
            console.log(error)

            return
          }

          setPosts(_posts)
        })

      else if(view === 'savedPosts')
        retrieveSavedPosts(context.userId, (error, _posts) => {
          if (error) {
            alert(error.message)
            console.log(error)

            return
          }

          setPosts(_posts)
        })

      else if(view === 'userPosts')
        retrieveUserPosts(context.userId, (error, _posts) => {
          if (error) {
            alert(error.message)
            console.log(error)

            return
          }

          setPosts(_posts)
        })

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
    {posts && posts.map(post => 
      <Post key={post.id} post={post} handleOpenEditPost={handleOpenEditPost} handleRefreshPosts={refreshPosts} user={user}/>
    )}
  </section>
}

