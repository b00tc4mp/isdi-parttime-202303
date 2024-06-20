import retrievePosts from '../../logic/retrievePosts'
import Post from './Post'
import { useState, useEffect } from 'react'
import { useAppContext , useHandleErrors} from '../hooks'

export default function Posts({ onEditPost , lastPostsUpdate, user }) {
    const { alert, freeze, unfreeze } = useAppContext()
    const handleErrors = useHandleErrors()

    const [posts, setPosts] = useState()

    useEffect(() => handleRefreshPosts(), [])
    
    const handleRefreshPosts = () => {
        try {
            freeze()

            handleErrors(async () => {
                const posts = await retrievePosts()
                setPosts(posts)
                unfreeze()
            })

        } catch (error) {
            alert(error.message)
            unfreeze()
        }
    }

    useEffect(() => {
        if(lastPostsUpdate)
            handleRefreshPosts()

    }, [lastPostsUpdate])


    return <section>
        {posts && posts.map((post) => <Post 
        key={post.id} 
        post={post} 
        onEditPost={onEditPost} 
        onToggledLikePost={handleRefreshPosts} 
        onPostDeleted={handleRefreshPosts} 
        onToggledSavePost={handleRefreshPosts}
        user={user} 
        />)}
    </section>    
}