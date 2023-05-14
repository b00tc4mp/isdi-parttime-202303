//import { getPostsSorted } from '../logic/retrieve-posts-sorted-by-date'
import Post from './Post'
import { retrievePosts } from '../logic/retrieve-posts'
import { context } from '../context'


export default function Posts({ onEditPost }) {
    console.log('Posts -> render')
  
    try {
      const _posts = retrievePosts(context.userAuth)
  
      return <main>
        <h1 className="home-page__main--title">Home</h1>
        <p className="home-page__main--welcome"></p>
        <div className="home-page__main--posts-list">
          { _posts.map((post) => <Post postId={post.id} authorId={post.author} key={post.id} onEditPost={onEditPost} />)}
        </div>
      </main>
  
    } catch (error) {
      console.log(`posts error: ${error.message}`)
    }
  }

  //TODO retrieveUSer info, retrievePost info, move necesari logic here,