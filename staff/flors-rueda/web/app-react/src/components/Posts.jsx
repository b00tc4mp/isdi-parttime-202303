//import { getPostsSorted } from '../logic/retrieve-posts-sorted-by-date'
import Post from './Post'
import { context }from '../context'
import posts from '../data/posts'
import { retrievePost } from '../logic/retrieve-post'
import { retrieveUser } from '../logic/retrieve-user'

export default function Posts({ handleLike }) {
    console.log('Posts -> render')
  
    try {
      const _posts = posts()
  
      return <main>
        <h1 className="home-page__main--title">Home</h1>
        <p className="home-page__main--welcome"></p>
        <div className="home-page__main--posts-list">
          { _posts.map((post) => <Post postId={post.id} authorId={post.author} key={post.id} handleLike={handleLike} />)}
        </div>
      </main>
  
    } catch (error) {
      console.log(`posts error: ${error.message}`)
    }
  }

  //TODO retrieveUSer info, retrievePost info, move necesari logic here,