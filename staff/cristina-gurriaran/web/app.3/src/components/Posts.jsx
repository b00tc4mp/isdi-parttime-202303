import retrievePosts from "../logic/retrievePosts"
import { context } from "../ui"
import Post from "./Post.jsx"

export default function Posts(){
    
    console.log('Posts -> render')
    
    try{
        const posts = retrievePosts(context.userId)

        return <section>
            { posts.map(post => <Post post={post} />)}
        </section>

    } catch(error){
        alert(error.message)
    }
    
}