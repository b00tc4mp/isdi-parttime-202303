import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'
import Post from './Post.jsx'

//lo hacemos con map y no con forEach porque necesitamos que nos devuelva un array

export default function Posts() {
    console.log('posts -> render')
    
    try {
        const posts = retrievePosts(context.userId)

        return <section>

            {posts.map(post => <Post post={post} />)} 

        </section>

    } catch (error){
        alert(error.message)
    }
}