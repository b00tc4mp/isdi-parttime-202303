import Post from "./Post"
import retrievePosts from "../logic/posts/retrievePosts"
import { context } from "../ui"

export default function Posts({props, onToggleLike, onToggleSave, onEditPost, onAddPostClick}) {
    function handleToggleLike() {
        onToggleLike()
    } 
    function handleToggleSave() {
        onToggleSave()
    } 
    function handleEditPost(id) {
        onEditPost(id)
    } 
    function handleAddPost(event) {
        event.preventDefault()
        onAddPostClick()
    }

    const userId = context.userId
    try {
        const posts = retrievePosts(userId)
        return  <>
        <div className="top">
            <h1>Home</h1>
            <h2 className="welcome-user"></h2>
            <button className="button--create-post" onClick={handleAddPost}>Create post <i className="material-symbols-outlined">add</i></button>
        </div>
        <div className="posts">
            {posts.map(post => <Post post={post} onToggleLikePost={handleToggleLike} onToggleSavePost={handleToggleSave} onEditPostButton={(id) => handleEditPost(id)} />)}
        </div>
            </>

    } catch(error) {
        console.log(error.stack)    
    }
}