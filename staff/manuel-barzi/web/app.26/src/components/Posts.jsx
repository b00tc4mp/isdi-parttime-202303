import retrievePosts from '../logic/retrievePosts'
import Post from './Post'
import { context } from '../ui'

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