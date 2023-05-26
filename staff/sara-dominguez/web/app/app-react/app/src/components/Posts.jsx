import { useState, useEffect } from 'react'
import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'
import Post from './Post.jsx'
import { useContext } from 'react'
import Context from '../components/Context.js'


export default function Posts({ onEditPost, lastPostsUpdate }) {
    const { alert } = useContext(Context)
    
    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPost(), []) 

    const handleRefreshPost = () => {
        try {
            retrievePosts(context.userId, (error, posts) => {
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
