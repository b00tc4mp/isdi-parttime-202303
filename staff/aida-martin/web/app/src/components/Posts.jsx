import { useState, useEffect } from 'react'
import './Posts.css'
import Post from './Post'
import retrievePosts from '../logic/retrievePosts'
import retrieveSavedPosts from '../logic/retrieveSavedPosts'
import { context } from '../ui'

export default function Posts ({ user, mySavedPosts = false, onEditPost, lastPostsUpdate, onRefreshUser }) {
  const [posts, setPosts] = useState()

  // esto se hace solo una vez (por eso no tiene a quién observar)
  useEffect(() => handleRefreshPosts(), [])

  const handleRefreshPosts = () => {
    try {
      if (!mySavedPosts) {
        retrievePosts(context.userId, (error, posts) => {
          if (error) {
            console.log(error.message)

            return
          }

          setPosts(posts)
        })
      } else {
        retrieveSavedPosts(context.userId, (error, savedPosts) => {
          if (error) {
            console.log(error.message)

            return
          }

          setPosts(savedPosts)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (lastPostsUpdate) { handleRefreshPosts() }
  }, [lastPostsUpdate])

  return (
    <section className='posts-list'>
      {posts && posts.map(post => <Post user={user} post={post} onEditPost={onEditPost} onLiked={handleRefreshPosts} onSaved={handleRefreshPosts} onDeletePost={handleRefreshPosts} key={post.id} />)}
    </section>
  )
}
