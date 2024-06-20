import retrievePosts from '../logic/retrievePosts'
import Post from './Post'
import { context } from '../ui'
import { useState, useEffect } from 'react'

export default function Posts({ onEditPost , lastPostsUpdate }) {

    let _posts

    try {
        _posts = retrievePosts(context.userId)

    } catch (error) {
        alert(error.message)
    }

    const [posts, setPosts] = useState(_posts)


    const handleRefreshPosts = () => {
        try {
            const posts = retrievePosts(context.userId)

            setPosts(posts)
        } catch (error) {
            alert(error.message)
        }
    }

    // componentDidMount() {
    //     console.log('Posts -> componentDidMount')
    // }

    // componentWillUnmount() {
    //     console.log('Posts -> componentWillUnmount')
    // }

    useEffect(() => {
        console.log('Posts -> componentDidMount with hooks')

        return () => console.log('Posts -> componentWillUnmount with hooks')
    },[])
    
    // componentWillReceiveProps(newProps) {
    //     console.log('Posts -> componentWillReceiveProps')

    //     if (this.props.lastPostsUpdate !== newProps.lastPostsUpdate)
    //         this.handleRefreshPosts()
    // }

    useEffect(() => {
        console.log('Posts -> componentWillReceiveProps with hooks')

        if(lastPostsUpdate)
            handleRefreshPosts()

    }, [lastPostsUpdate])


    console.log('Posts -> render')

    return <section>
        {posts.map(post => <Post key={post.id} post={post} onEditPost={onEditPost} onToggledLikePost={handleRefreshPosts} onPostDeleted={handleRefreshPosts} />)}
        </section>    
}