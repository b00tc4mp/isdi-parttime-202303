import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'
import Post from './Post.jsx'

//lo hacemos con map y no con forEach porque necesitamos que nos devuelva un array

export default function Posts({ onEditPost }) {
    console.log('posts -> render')

    // function handleEditPost (postId) {
    //     onEditPost(postId)
    // }
    
    // try {
    //     const posts = retrievePosts(context.userId)

    //     return <section>

    //         {posts.map(post => <Post post={post} onEditPost={ handleEditPost }/>)} 

    //     </section>

    // } catch (error){
    //     alert(error.message)
    // }

    try {
        const posts = retrievePosts(context.userId)

        return <section>

            {posts.map((post, index)  => <Post 
            key={index}
            post={post} 
            onEditPost={ onEditPost }/>)} 

        </section>

    } catch (error){
        alert(error.message)
    }
}