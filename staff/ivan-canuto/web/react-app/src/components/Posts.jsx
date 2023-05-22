import { retrievePosts } from "../logic/retrievePosts";
import Post from "./Post";
import { context } from "../ui";
import { useState, useEffect } from "react";
import { retrieveSavedPosts } from "../logic/retrieveSavedPosts";
import { retrieveUserPosts } from "../logic/retrieveUserPosts";
import './components-styles/Posts.css'


export default function Posts({ handleOpenEditPost, lastPostsUpdate, view , handleOpenPostpriceModal, handleOpenBuyPostModal}) {

  const [posts, setPosts] = useState(null)

  const handleRefreshPosts = () => {
    try {

      if(view === 'posts')
        retrievePosts(context.userId, (error, _posts) => {
          if (error) {
            alert(error.message)
            console.log(error)

            return
          }
          console.log('Postsss -> render')

          setPosts(_posts)
        })

      else if(view === 'savedPosts')
        retrieveSavedPosts(context.userId, (error, _posts) => {
          if (error) {
            alert(error.message)
            console.log(error)

            return
          }
          console.log('Saved postsss -> render')
          setPosts(_posts)
        })

      else if(view === 'userPosts')
        retrieveUserPosts(context.userId, (error, _posts) => {
          if (error) {
            alert(error.message)
            console.log(error)

            return
          }
          console.log('Own postsss -> render')

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
    handleRefreshPosts()

    if(lastPostsUpdate) {
      handleRefreshPosts()
    }
      
  }, [lastPostsUpdate])

  return <section className="posts-list">
    {posts && posts.map(post => ((post.author.id !== context.userId) && !post.visible) ? '' : <Post key={post.id} post={post} handleOpenEditPost={handleOpenEditPost} handleRefreshPosts={handleRefreshPosts} handleOpenPostpriceModal={handleOpenPostpriceModal} handleOpenBuyPostModal={handleOpenBuyPostModal}/>
    )}
  </section>
}
