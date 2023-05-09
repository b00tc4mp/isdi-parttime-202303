import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'
import Post from './Post.jsx'

function Posts({onEditPost, onLikePost, onFavourite}) {

    try {
        const posts = retrievePosts(context.userId)

        return <section>            
            { posts.map(post => 
            <Post 
                key={post.id} 
                onEditPostButton={onEditPost}
                onLikePostButton={onLikePost}
                onFavouritePostButton={onFavourite} 
                post={post} />)
            }
        </section>

    } catch (error) {
        alert(error.message)
    }
}

export default Posts