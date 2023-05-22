import { useEffect, useState } from 'react';
import retrievePosts from '../logic/retrievePosts.js';
import { context } from '../ui.js';
import Post from './Post.jsx';

const Posts = ({onEditPost, lastPostUpdate}) => {
        
        let postsRetrieved

        try {
            postsRetrieved = retrievePosts(context.userId)
            
        } catch (error) {
            alert(error.message)
        }
        
    const [posts, setPosts] = useState(postsRetrieved);

    const handleRefreshPost = () => {
        try {
            const postsRetrieved = retrievePosts(context.userId)
            setPosts(postsRetrieved)
    
        } catch (error) {
            alert(error.message)
        }
    };

    useEffect(() =>{
        if(lastPostUpdate) handleRefreshPost()
    }, [lastPostUpdate]);

    return <section className='container'>            
        { posts.map(post => 
        <Post 
            key={post.id} 
            onEdit={onEditPost}
            onLike={handleRefreshPost}
            onFavourite={handleRefreshPost}
            onDelete={handleRefreshPost}
            post={post} />)
        }
    </section>

    }


export default Posts