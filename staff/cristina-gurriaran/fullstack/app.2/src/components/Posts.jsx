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
        try {
            freeze()
            retrievePosts(context.userId, (error, posts) => {
                unfreeze()
                if(error){
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
        console.log('Posts -> componentDidMount with hooks')

        return () => console.log('Posts -> componentWillUnmount with hooks')
    },[])


    useEffect(() => {
        console.log('Posts -> componentWillReceiveProps with hooks')

        if(lastPostsUpdate)
            handleRefreshPosts()

    }, [lastPostsUpdate])


    console.log('Posts -> render')

    return <section>
        {posts && posts.map(post => <Post 
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