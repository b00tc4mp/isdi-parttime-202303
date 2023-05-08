import Post from './Post'
import retrievePosts from '../logic/retrievePosts'
import { context } from '../ui'

export default function Posts ({ currentUser, onEditPost, onLiked, onSaved }) {
  try {
    const posts = retrievePosts(context.userId)

    return <section className='posts-list'>{posts.map(post => <Post currentUser={currentUser} post={post} onEditPost={onEditPost} onLiked={onLiked} onSaved={onSaved} key={post.id} />)}</section>
  } catch (error) {
    console.log(error.message)
  }
}
