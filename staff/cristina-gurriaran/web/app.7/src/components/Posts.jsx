import retrievePosts from "../logic/retrievePosts"
import { context } from "../ui"
import Post from "./Post.jsx"

export default function Posts({ onToggleLike, onEditPost}){
    
    console.log('Posts -> render')

    function handleEditPost(postId){
        onEditPost(postId)
    }

    function handleToggleLike(){

        onToggleLike()
    }
    
        try{
            const posts = retrievePosts(context.userId)

            return <section>
                { posts.map(post => <Post 
                post={post}
                onLikePostClick={handleToggleLike} 
                onEditPost={handleEditPost}
                />)}
            </section>

        } catch(error){
            alert(error.message)
        }
    
    
}