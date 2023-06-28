import { retrievePosts } from "../logic/retrievePosts";
import Post from "./Post";
import { context } from "../ui";
import { useState, useEffect } from "react";
import { retrieveSavedPosts } from "../logic/retrieveSavedPosts";
import { retrieveUserPosts } from "../logic/retrieveUserPosts";
import { useAppContext } from "../hooks"

export default function Posts({ lastPostsUpdate, view, handleOpenBuyPost, handleOpenEditPost, handleOpenDeletePost, handleToggleVisibility, handleToggleOnSalePost }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [posts, setPosts] = useState(null)

  const handleRefreshPosts = () => {
    try {
      freeze()

      if(view === 'posts') {
        retrievePosts(context.userId, (error, _posts) => {
          unfreeze()
          
          if (error) {
            alert(error.message, 'error')
            console.debug(error)
            
            return
          }
          console.debug('Postsss -> render')
          
          setPosts(_posts)
        })
      }
      
      else if(view === 'savedPosts') {
        retrieveSavedPosts(context.userId, (error, _posts) => {
          unfreeze()
          
          if (error) {
            alert(error.message, 'error')
            console.debug(error, 'posts-40')
            
            return
          }
          console.debug('Saved postsss -> render')
          setPosts(_posts)
        })
      }

      else if(view === 'userPosts') {
        retrieveUserPosts(context.userId, (error, _posts) => {
          unfreeze()

          if (error) {
            alert(error.message, 'error')
            console.debug(error)
            
            return
          }
          console.debug('Own postsss -> render')
          
          setPosts(_posts)
        })
      }

    } catch(error) {
      unfreeze()
      alert(error.message, 'error')
      console.debug(error);
    }
  } 
  
  useEffect(() => {
    console.debug('Posts -> "ComponentDidMount" with hooks.');

    return () => console.debug('Posts -> "ComponentWillUnmount" with hooks.');
  }, [])

  useEffect(() => {
    console.debug('Posts -> "ComponentWillRecieveProps" with hooks.');
    // handleRefreshPosts()

    if(lastPostsUpdate) {
      handleRefreshPosts()
    }
      
  }, [lastPostsUpdate])

  return <section className="pt-20 pb-32 flex flex-col items-center gap-6">
    {posts && posts.map(post => ((post.author.id !== context.userId) && !post.visible) ? '' : <Post
      key={post._id.toString()}
      post={post}
      handleRefreshPosts={handleRefreshPosts}
      handleOpenEditPost={handleOpenEditPost}
      handleOpenDeletePost={handleOpenDeletePost}
      handleToggleVisibility={handleToggleVisibility}
      handleToggleOnSalePost={handleToggleOnSalePost}
      handleOpenBuyPost={handleOpenBuyPost}
    />)}
  </section>
}
