import retrievePosts from '../logic/retrievePosts.js'
import Post from './Post.jsx'
import { context } from '../ui.js'

export default function Posts() {
    console.log('Posts -> render')

    try {
        const posts = retrievePosts(context.userId)

        return <section>
            { posts.map(post => <Post post={post} />)}
        </section>
    } catch (error) {
        alert(error.message)
    }
}