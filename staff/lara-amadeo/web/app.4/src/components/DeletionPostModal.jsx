import { context, generateToast, successToast } from "../ui"
import deletePost from "../logic/deletePost"

export default function DeletionPostModal(props){

    function handleDeletionPost(event){
        event.preventDefault()

        const postId = props.postId
        deletePost(context.userId, postId)
        props.onConfirmDeletePost()

        generateToast({
            message: 'Post deleted!',
            type: successToast
        })
    }

    function onCancel(event){
        event.preventDefault()
        props.onCancelDeletePost()
    }

    return <div className="edit-post-modal">
    <div className="centered-containers">
        <form className="centered-form" onSubmit={handleDeletionPost}>
            
            <p className="title">Delete post</p>
            <p className="body-text">Are you sure you want to delete this post?</p>

            <div className="button-bar">
                <button className="button-S secondary-button" type="button" onClick={onCancel}>Cancel</button>
                <button className="button-S critical-button" type="submit">Delete</button>
            </div>
        </form>
    </div>
</div>
}