import { retrievePosts } from "../logic/retrievePosts";
import Post from "./Post";
import { context } from "../ui";
import { useState, useEffect } from "react";
import { retrieveSavedPosts } from "../logic/retrieveSavedPosts";
import { retrieveUserPosts } from "../logic/retrieveUserPosts";
import { useAppContext } from "../hooks"
import { utils } from "com";

const { extractSubFromToken } = utils

export default function Posts({ lastPostsUpdate, view, handleOpenBuyPost, handleOpenEditPost, handleOpenDeletePost, handleToggleVisibility, handleToggleOnSalePost }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [posts, setPosts] = useState(null)

  useEffect(() => handleRefreshPosts(), [])

  const handleRefreshPosts = () => {
    try {
      freeze()

      if(view === 'posts') {
        // retrievePosts(context.token, (error, _posts) => {
        //   if (error) {
        //     alert(error.message, 'error')
        //     console.debug(error)
            
        //     return
        //   }
        //   console.debug('Postsss -> render')
          
        //   setPosts(_posts)
        // })

        retrievePosts(context.token)
          .then(_posts => {
            unfreeze()
            console.debug('Postsss -> render')
            
            setPosts(_posts)
          })
          .catch(error => {
            unfreeze()

            alert(error, 'error')
            console.debug(error)
          })
      }
      
      else if(view === 'savedPosts') {
        // retrieveSavedPosts(context.token, (error, _posts) => {
        //   if (error) {
        //     alert(error, 'error')
        //     console.debug(error)
            
        //     return
        //   }
        //   console.debug('Saved postsss -> render')

        //   setPosts(_posts)
        // })

        retrieveSavedPosts(context.token)
          .then(_posts => {
            unfreeze()
            console.debug('Saved postsss -> render')

            setPosts(_posts)
          })
          .catch(error => {
            unfreeze()

            alert(error, 'error')
            console.debug(error)
          })
      }

      else if(view === 'userPosts') {
        // retrieveUserPosts(context.token, (error, _posts) => {
        //   unfreeze()

        //   if (error) {
        //     alert(error, 'error')
        //     console.debug(error)
            
        //     return
        //   }
        //   console.debug('Own postsss -> render')
          
        //   setPosts(_posts)
        // })

        retrieveUserPosts(context.token)
          .then(_posts => {
            unfreeze()
            console.debug('Own postsss -> render')
            
            setPosts(_posts)
          })
          .catch(error => {
            unfreeze()

            alert(error, 'error')
            console.debug(error)
          })
      }

    } catch(error) {
      unfreeze()

      alert(error, 'error')
      console.debug(error)
    }
  } 
  
  useEffect(() => {
    console.debug('Posts -> "ComponentDidMount" with hooks.');

    return () => console.debug('Posts -> "ComponentWillUnmount" with hooks.');
  }, [])

  useEffect(() => {
    console.debug('Posts -> "ComponentWillRecieveProps" with hooks.');

    if(lastPostsUpdate) {
      handleRefreshPosts()
    }
      
  }, [lastPostsUpdate])

  return <section className="pt-20 pb-32 flex flex-col items-center gap-6">
    {posts && posts.map(post => ((post.author.id !== extractSubFromToken(context.token)) && !post.visible) ? '' : <Post
      key={post.id.toString()}
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
