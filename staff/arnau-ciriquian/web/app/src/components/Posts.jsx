import { context } from "../ui"
import retrievePosts from "../logic/retrivePosts"
import Post from "./Post"
import { useState, useEffect } from "react"
import './Posts.css'

export default function Posts({ onEditClicked, lastPostsUpdate }) {
    let _posts    
    try {
        _posts = retrievePosts(context.userId)
    } catch (error) {
        alert(error.message)
    }

    const[posts, setPosts] = useState(_posts)

    const handleRefreshPosts = () => {
        try {
            const _posts = retrievePosts(context.userId)

            setPosts(_posts)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        console.log('Posts -> "ComponentDidMount" with hooks')

        return () => console.log('Posts -> "ComponentWillUnmount" with hooks')
    }, [])

    useEffect(() => {
        console.log('Posts -> "ComponentWillRecieveProps" with hooks')

        if (lastPostsUpdate)
            handleRefreshPosts()

    }, [lastPostsUpdate])
    
    return <section className="home__post--feed">
        { posts.map(post => <Post key={post.id} post={post} onLikePostClick={handleRefreshPosts} onEditClick={onEditClicked}/>)}
    </section>
}