import { useEffect, useState } from 'react';
import { useAppContext } from '../hooks';
import retrievePosts from '../logic/retrievePosts.js';
import { context } from '../ui';
import Post from './Post.jsx';


const Posts = ({onEditPost, onSellPost, lastPostUpdate}) => {
    const { alert, freeze, unfreeze } = useAppContext(),
        [posts, setPosts] = useState();

    useEffect(() => handleRefreshPost(), [])

    const handleRefreshPost = () => {
        try {
            freeze()

            retrievePosts(context.userId, (error, posts) => {
                unfreeze()

                if (error) {
                    alert(error)

                    return
                }

                setPosts(posts)
            })
            
        } catch (error) {
            alert(error.message)
        }
    };
        
    useEffect(() =>{
        if(lastPostUpdate) handleRefreshPost()
    }, [lastPostUpdate]);

    return <section className='container'>            
        { posts && posts.map(post => 
        <Post 
            key={post.id} 
            post={post} 
            onEdit={onEditPost}
            onSell={onSellPost}
            onLike={handleRefreshPost}
            onFavourite={handleRefreshPost}
            onDelete={handleRefreshPost}
            onBuy={handleRefreshPost}
        />)}
    </section>
}


export default Posts