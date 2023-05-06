import { context, errorToast, generateToast } from '../ui.js'
import retrievePosts from '../logic/retrievePosts.js'
import Post from './post.jsx'

export default function Posts(props){

    function handleLikePost() {
        props.onLikePost()
    } 

    function handleSavePost(){
        props.onSavePost()
    }

    function handleCreatePost(){
        props.onCreateButton()
    }

    function handleOpenEditModal(){
        props.onEditPostButtonClick()
    }

    try{
        const posts = retrievePosts(context.userId)

        return <div className="feed">
        <div className="header">
            <p className="heading-M-bold">Home</p>
            <button className="button-S primary-button create-post-button" onClick={handleCreatePost}>Create</button>
        </div>
        <div className="posts">
            {posts.map(post =>
                <Post
                post={post}
                onLikeButtonClick={handleLikePost}
                onSaveButtonClick={handleSavePost}
                onEditPostButton={handleOpenEditModal}
                />)}
        </div>     
    </div>
    } catch(error){
        generateToast({
            message: error.message,
            type: errorToast
        })
    }
}
