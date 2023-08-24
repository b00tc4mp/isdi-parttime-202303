import Post from "./Post";
import { useState, useEffect } from "react";
import { retrievePosts, retrieveSavedPosts, retrieveUserPosts, getUserId, retrieveSeenPosts } from "../../logic";
import { useAppContext, useHandleErrors } from "../hooks"

export default function Posts({ lastPostsUpdate, view, handleOpenEditPost, handleOpenDeletePost, handleToggleVisibility, handleTogglePostModal }) {
  const { alert } = useAppContext()
  const handleErrors = useHandleErrors()

  const [posts, setPosts] = useState(null)

  useEffect(() => handleRefreshPosts(), [])

  const handleRefreshPosts = () => {
    try {
      if(view === 'posts') {
        handleErrors(async () => {
          console.debug('Postsss -> render')

          const _posts = await retrievePosts()

          setPosts(_posts)
        })

        // retrievePosts()
        //   .then(_posts => {
        //     console.debug('Postsss -> render')
            
        //     setPosts(_posts)
        //   })
        //   .catch(error => {
        //     alert(error, 'error')
        //     console.debug(error)
        //   })
          // .finally(unfreeze)
      }
      else if(view === 'savedPosts') {
        handleErrors(async () => {
          console.debug('Saved postsss -> render')

          const _posts = await retrieveSavedPosts()

          setPosts(_posts)
        })
      }
      else if(view === 'userPosts') {
        handleErrors(async () => {
          console.debug('Own postsss -> render')
          
          const _posts = await retrieveUserPosts()

          setPosts(_posts)
        })
      }
      else if(view === 'seenPosts') {
        handleErrors(async () => {
          console.debug('Seen postsss -> render')
          
          const _posts = await retrieveSeenPosts()

          setPosts(_posts)
        })
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
      console.log('Post -> last render');

      handleRefreshPosts()
    }
  }, [lastPostsUpdate])

  return <section className="pb-12 flex flex-col items-center gap-6 absolute top-40 left-0 w-full">
    <h1 className="w-full text-center text-5xl font-thin underline mb-4">{view === 'posts' ? 'Home page' : view === 'savedPosts' ? 'Saved posts' : view === 'userPosts' ? 'My posts' : view === 'seenPosts' ? 'Seen lately' : ''}</h1>
    {posts && posts.map(post => (post.author.id !== getUserId() && !post.visible) ? '' : <Post
      key={post.id.toString()}
      post={post}
      handleRefreshPosts={handleRefreshPosts}
      handleOpenEditPost={handleOpenEditPost}
      handleOpenDeletePost={handleOpenDeletePost}
      handleToggleVisibility={handleToggleVisibility}
      handleTogglePostModal={handleTogglePostModal}
    />)}
  </section>
}