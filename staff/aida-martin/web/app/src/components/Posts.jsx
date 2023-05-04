import Post from './Post.jsx'
import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'

export default function Posts ({ currentUser }) {
  try {
    const posts = retrievePosts(context.userId)

    return <section className='posts-list'>{posts.map(post => <Post currentUser={currentUser} post={post} key={post.id} />)}</section>
  } catch (error) {
    console.log(error.message)
  }
}
