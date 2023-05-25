import { useEffect, useState } from "react"
import Post from "./Post"
import retrievePosts from "../logic/posts/retrievePosts"
import { context } from "../ui"
import './Posts.css'

export default function Posts({onToggleLike, onToggleSave, onEditPost, onAddPostClick, lastPostsUpdate, onToggleLikePostClick, onToggleSavePostClick}) {
    const userId = context.userId

    let _posts
    try {
        _posts = retrievePosts(userId)
    } catch(error) {
        console.log(error)
    }

    const [posts, setPosts] = useState( _posts )

    function handleRefreshPosts() {
        try {
            const _posts = retrievePosts(userId)
            setPosts( _posts )
        } catch (error) {
            console.log(error)
        }
    } 
    function handleToggleLikePost() {
        try {
            onToggleLikePostClick()
        } catch (error) {
            console.log(error)
        }
    } 
    function handleToggleSavePost() {
        try {
            onToggleSavePostClick()
        } catch (error) {
            console.log(error)
        }
    } 

    function handleEditPost(id) {
        onEditPost(id)
    } 
    function handleAddPost(event) {
        event.preventDefault()
        onAddPostClick()
    }

    useEffect(() => {
        console.log('Refresh Posts -> render in useEffect')
        if(lastPostsUpdate) {
            handleRefreshPosts()
        }
    }, [lastPostsUpdate])

    try {
        return  <>
            <div className="top">
                <h1>Home</h1>
                <h2 className="welcome-user"></h2>
                <button className="button--create-post" onClick={handleAddPost}>Create post <i className="material-symbols-outlined">add</i></button>
            </div>
            <div className="posts">
                {posts.map(post => {
                return <Post key={post.id} post={post} onToggleLikePost={handleToggleLikePost} onToggleSavePost={handleToggleSavePost} onEditPostButton={(id) => handleEditPost(id)} />
            })}
            </div>
        </>
    
    } catch(error) {
        console.log(error.stack)    
    }
}