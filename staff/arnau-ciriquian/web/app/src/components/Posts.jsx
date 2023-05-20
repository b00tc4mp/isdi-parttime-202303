import { context } from "../ui"
import retrievePosts from "../logic/retrievePosts"
import Post from "./Post"
import { useState, useEffect } from "react"
import './Posts.css'

export default function Posts({ onEditClicked, lastPostsUpdate }) {
    const[posts, setPosts] = useState()

    useEffect(() => handleRefreshPosts(), [])

    const handleRefreshPosts = () => {
        try {
            retrievePosts(context.userId, (error, posts) => {
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
        console.log('Posts -> "ComponentDidMount" with hooks')

        return () => console.log('Posts -> "ComponentWillUnmount" with hooks')
    }, [])

    useEffect(() => {
        console.log('Posts -> "ComponentWillRecieveProps" with hooks')

        if (lastPostsUpdate)
            handleRefreshPosts()

    }, [lastPostsUpdate])

    console.log('Posts -> render')
    
    return <section className="home__post--feed">
        {posts && posts.map(post => <Post key={post.id} post={post} onLikePostClick={handleRefreshPosts} onEditClick={onEditClicked}/>)}
    </section>
}