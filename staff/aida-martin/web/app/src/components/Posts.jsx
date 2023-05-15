import { useState, useEffect } from 'react'
import './posts.css'
import Post from './Post'
import retrievePosts from '../logic/retrievePosts'
import retrieveSavedPosts from '../logic/retrieveSavedPosts'
import { context } from '../ui'

export default function Posts ({ currentUser, mySavedPosts = false, onEditPost, lastPostsUpdate, onRefreshUser }) {
  try {
    const [posts, setPosts] = useState(!mySavedPosts ? retrievePosts(context.userId) : retrieveSavedPosts(context.userId, mySavedPosts))

    const handleRefreshPosts = () => {
      try {
        setPosts(!mySavedPosts ? retrievePosts(context.userId) : retrieveSavedPosts(context.userId, mySavedPosts))

        onRefreshUser()
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      if (lastPostsUpdate) { handleRefreshPosts() }
    }, [lastPostsUpdate])

    return <section className='posts-list'>{posts.map(post => <Post currentUser={currentUser} post={post} onEditPost={onEditPost} onLiked={handleRefreshPosts} onSaved={handleRefreshPosts} onDeletePost={handleRefreshPosts} key={post.id} />)}</section>
  } catch (error) {
    console.log(error.message)
  }
}
