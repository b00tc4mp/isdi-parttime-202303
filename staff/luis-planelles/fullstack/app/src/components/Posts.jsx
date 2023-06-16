import { useEffect, useState } from 'react';
import { useAppContext } from '../hooks';
import retrievePosts from '../logic/retrievePosts.js';
import { context } from '../ui';
import Post from './Post.jsx';


const Posts = ({onEditPost, onSellPost, lastPostUpdate}) => {
    const { alert, freeze, unfreeze } = useAppContext(),
        [posts, setPosts] = useState();

    useEffect(() => HandlerefreshPost(), [])

    const HandlerefreshPost = () => {
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
        if(lastPostUpdate) HandlerefreshPost()
    }, [lastPostUpdate]);

    return <section className='container'>            
        { posts && posts.map(post => 
        <Post 
            key={post.id} 
            post={post} 
            onEdit={onEditPost}
            onSell={onSellPost}
            onLike={HandlerefreshPost}
            onFavourite={HandlerefreshPost}
            onDelete={HandlerefreshPost}
            onBuy={HandlerefreshPost}
        />)}
    </section>
}


export default Posts