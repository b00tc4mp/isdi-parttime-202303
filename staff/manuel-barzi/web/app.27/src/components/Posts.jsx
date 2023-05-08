import retrievePosts from '../logic/retrievePosts'
import Post from './Post'
import { context } from '../ui'

export default function Posts({ onEditPost }) {
    console.log('Posts -> render')

    // function handleEditPost(postId) {
    //     onEditPost(postId)
    // }

    // try {
    //     const posts = retrievePosts(context.userId)

    //     return <section>
    //         { posts.map(post => <Post post={post} onEditPost={handleEditPost} />)}
    //     </section>
    // } catch (error) {
    //     alert(error.message)
    // }

    try {
        const posts = retrievePosts(context.userId)

        return <section>
            {posts.map(post => <Post post={post} onEditPost={onEditPost} />)}
        </section>
    } catch (error) {
        alert(error.message)
    }
}