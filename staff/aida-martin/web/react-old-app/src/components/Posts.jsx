import Post from './Post'
import retrievePosts from '../logic/retrievePosts'
import retrieveSavedPosts from '../logic/retrieveSavedPosts'
import { context } from '../ui'

export default function Posts ({ currentUser, mySavedPosts = false, onEditPost, onLiked, onSaved, onDeletePost }) {
  try {
    let posts

    if (!mySavedPosts) {
      posts = retrievePosts(context.userId)
    } else {
      posts = retrieveSavedPosts(context.userId, mySavedPosts)
    }

    return <section className='posts-list'>{posts.map(post => <Post currentUser={currentUser} post={post} onEditPost={onEditPost} onLiked={onLiked} onSaved={onSaved} onDeletePost={onDeletePost} key={post.id} />)}</section>
  } catch (error) {
    console.log(error.message)
  }
}
