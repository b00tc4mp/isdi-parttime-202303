import { getPostsSorted } from '../logic/retrieve-posts-sorted-by-date'
import Post from './Post'
import { context } from '../ui/general-tools.js'

export default function Posts({ handleLike }) {
    console.log('Posts -> render')
  
    try {
      const posts = getPostsSorted(context.userAuth)
  
      return <main>
        <h1 className="home-page__main--title">Home</h1>
        <p className="home-page__main--welcome"></p>
        <div className="home-page__main--posts-list">
          { posts.map(post => <Post post={post} key={post.postData.id} handleLike={handleLike} />)}
        </div>
      </main>
  
    } catch (error) {
      alert(`posts error: ${error.message}`)
    }
  }