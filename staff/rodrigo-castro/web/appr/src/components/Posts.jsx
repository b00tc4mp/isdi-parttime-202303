import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'
import Post from './Post.jsx'

export default function Posts() {
    try {
        const posts = retrievePosts(context.userId)

        return <section>
            { posts.map(post => <Post post={post}/>)}
        </section>
    } catch(error) {
        alert(error.message)
    }
    
}