import retrievePosts from "../logic/retrievePosts"
import { context } from "../ui"
import Post from "./Post.jsx"

export default function Posts(props){
    
    console.log('Posts -> render')

    function handleToggleLike(){

        props.onToggleLike()
    }
    
        try{
            const posts = retrievePosts(context.userId)

            return <section>
                { posts.map(post => <Post post={post}
                onLikePostClick={handleToggleLike} />)}
            </section>

        } catch(error){
            alert(error.message)
        }
    
    
}