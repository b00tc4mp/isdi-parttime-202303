import { useState, useEffect, useContext } from 'react'
import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'
import Post from './Post.jsx'
import Context from '../components/Context.js'


export default function Posts({ onEditPost, lastPostsUpdate }) {
    const { alert, freeze, unfreeze } = useContext(Context)
    
    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPost(), []) 

    const handleRefreshPost = () => {
        try {
            freeze()
            retrievePosts(context.userId, (error, posts) => {
                unfreeze()
                if (error) {
                    alert(error.message)

                    return
                }
                setPosts(posts)

            })

        } catch (error) {
            alert(error.message)
        }
    }
   
    useEffect(() => {
        console.debug('Posts-> componenWillReceiveProps with Hooks')

        if (lastPostsUpdate)
            handleRefreshPost()
    }, [lastPostsUpdate])


    console.debug('posts -> render')

    return <section>
        {posts && posts.map((post) => <Post
            key={post.id}
            post={post}
            onEditPost={onEditPost}
            onToggledLikePost={handleRefreshPost}
            onPostDeleted={handleRefreshPost} 
            onToggledSavePost={handleRefreshPost}
            />)}
    </section>
}
