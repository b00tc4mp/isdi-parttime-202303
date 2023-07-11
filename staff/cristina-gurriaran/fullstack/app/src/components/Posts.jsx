import retrievePosts from '../logic/retrievePosts'
import Post from './Post'
import { context } from '../ui'
import { useState, useEffect } from 'react'
import { useAppContext } from '../hooks'

export default function Posts({ onEditPost , lastPostsUpdate, user }) {
    const { alert, freeze, unfreeze } = useAppContext()
    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPosts(), [])
    
    const handleRefreshPosts = () => {
        freeze()
        try {
            retrievePosts(context.token)
                .then((posts) => {
                    unfreeze()
                    setPosts(posts)
                })
                .catch((error) => {
                    unfreeze()
                    alert(error.message, 'error')
                })

        } catch (error) {
            unfreeze()
            alert(error.message, 'warn')
        }
    }

    useEffect(() => {
        if(lastPostsUpdate)
            handleRefreshPosts()

    }, [lastPostsUpdate])


    return <section>
        {posts && posts.map((post) => <Post 
        key={post._id} 
        post={post} 
        onEditPost={onEditPost} 
        onToggledLikePost={handleRefreshPosts} 
        onPostDeleted={handleRefreshPosts} 
        onToggledSavePost={handleRefreshPosts}
        user={user} 
        />)}
    </section>    
}