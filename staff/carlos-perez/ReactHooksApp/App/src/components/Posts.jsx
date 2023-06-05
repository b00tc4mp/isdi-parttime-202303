import {retrievePosts} from '../logic/retrievePosts'
import Post from './Post'
import { useState, useEffect } from 'react'

export default function Posts({ onEditPost, lastPostsUpdate }) {
    let _posts

    try {
        _posts = retrievePosts()
    } catch (error) {
        alert(error.message)
    }

    const [posts, setPosts] = useState(_posts)

    const handleRefreshPosts = () => {
        try {
            const posts = retrievePosts()

            setPosts(posts)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log('Posts -> "componentDidMount" with hooks')

        return () => console.log('Posts -> "componentWillUnmount" with hooks')
    }, [])

    useEffect(() => {
        console.log('Posts -> "componentWillReceiveProps" with hooks')
        
        if (lastPostsUpdate)
            handleRefreshPosts()
    }, [lastPostsUpdate])

    console.log('Posts -> render')

    return <section>
        {posts.map(post => <Post key={post.id} post={post} onEditPost={onEditPost} onToggledLikePost={handleRefreshPosts} onPostDeleted={handleRefreshPosts} />)}
    </section>
}