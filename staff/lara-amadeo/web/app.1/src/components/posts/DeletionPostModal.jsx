import { context, generateToast, successToast } from "../../ui"
import deletePost from "../../logic/deletePost"

export default function DeletionPostModal({ postId, onConfirmDeletePost, onCancelDeletePost }){

    function handleDeletionPost(event){
        event.preventDefault()
        try {
            deletePost(context.userId, postId, (error) => {
                if(error){
                    generateToast({
                        message: error.message + error.stack,
                        type: errorToast
                    })
                    return
                }
                onConfirmDeletePost()
        
                generateToast({
                    message: 'Post deleted!',
                    type: successToast
                })
            })
        } catch(error) {
            generateToast({
                message: error.message + error.stack,
                type: errorToast
            })
        }
    }

    function onCancel(event){
        event.preventDefault()
        onCancelDeletePost()
    }

    return <div className="modal-overlay">
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