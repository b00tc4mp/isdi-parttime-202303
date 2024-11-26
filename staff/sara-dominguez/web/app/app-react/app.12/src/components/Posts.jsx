import { useState, useEffect } from 'react'
import retrievePosts from '../logic/retrievePosts.js'
import { context } from '../ui.js'
import Post from './Post.jsx'


export default function Posts({ onEditPost, lastPostsUpdate }) {
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
        console.log('Posts-> componenWillReceiveProps with Hooks')

        if (lastPostsUpdate)
            handleRefreshPost()
    }, [lastPostsUpdate])


    console.log('posts -> render')

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
