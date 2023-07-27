import Post from "./Post";
import { useState, useEffect } from "react";
import { retrievePosts, retrieveSavedPosts, retrieveUserPosts, getUserId } from "../../logic";
import { useAppContext } from "../hooks"

export default function Posts({ lastPostsUpdate, view, handleOpenBuyPost, handleOpenEditPost, handleOpenDeletePost, handleToggleVisibility, handleToggleOnSalePost }) {
  const { alert } = useAppContext()

  const [posts, setPosts] = useState(null)

  useEffect(() => handleRefreshPosts(), [])

  const handleRefreshPosts = () => {
    try {
      // freeze()

      if(view === 'posts') {
        retrievePosts()
          .then(_posts => {
            console.debug('Postsss -> render')
            
            setPosts(_posts)
          })
          .catch(error => {
            alert(error, 'error')
            console.debug(error)
          })
          // .finally(unfreeze)
      }
      
      else if(view === 'savedPosts') {
        retrieveSavedPosts()
          .then(_posts => {
            console.debug('Saved postsss -> render')

            setPosts(_posts)
          })
          .catch(error => {
            alert(error, 'error')
            console.debug(error)
          })
          // .finally(unfreeze)
      }

      else if(view === 'userPosts') {
        retrieveUserPosts()
          .then(_posts => {
            console.debug('Own postsss -> render')
            
            setPosts(_posts)
          })
          .catch(error => {
            alert(error, 'error')
            console.debug(error)
          })
          // .finally(unfreeze)
      }
    } catch(error) {
      // unfreeze()
      
      alert(error, 'error')
      console.debug(error)
    }
  }
  
  useEffect(() => {
    console.debug('Posts -> "ComponentWillRecieveProps" with hooks.');

    if(lastPostsUpdate) {
      handleRefreshPosts()
    }
      
  }, [lastPostsUpdate])

  return <section className="pt-20 pb-32 flex flex-col items-center gap-6">
    {posts && posts.map(post => (post.author.id !== getUserId() && !post.visible) ? '' : <Post
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
