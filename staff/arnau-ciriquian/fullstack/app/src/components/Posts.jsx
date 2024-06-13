import retrievePosts from "../logic/retrievePosts"
import Post from "./Post"
import { useState, useEffect } from "react"
import './Posts.css'

export default function Posts({ onEditClicked, lastPostsUpdate }) {
    const[posts, setPosts] = useState()

    useEffect(() => handleRefreshPosts(), [])

    const handleRefreshPosts = () => {
        try {
            retrievePosts()
                .then(setPosts)
                .catch(error => alert(error.message))
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
        {posts && posts.map(post => <Post 
            key={post.id}
            post={post}
            onLikePostClick={handleRefreshPosts}
            onEditClick={onEditClicked}
            onDeletePostClick={handleRefreshPosts}
            onFavPostClick={handleRefreshPosts}
            onHidePostClick={handleRefreshPosts}/>)}
    </section>
}