import { context } from "../ui"
import deletePost from "../logic/deletePost"

export default function DeletionPostModal(props){

    function handleDeletionPost(event){
        event.preventDefault()

        const postId = props.postId
        deletePost(context.userId, postId)
        console.log('postDeleted')
        props.onConfirmDeletePost()
    }

    function onCancel(event){
        event.preventDefault()
        props.onCancelDeletePost()
    }

    return <div className="edit-post-modal">
    <div className="centered-containers">
        <form className="centered-form" onSubmit={handleDeletionPost}>
            
            <p className="title">Delete post</p>


            <div className="button-bar">
                <button className="button-S secondary-button" type="button" onClick={onCancel}>Cancel</button>
                <button className="button-S primary-button" type="submit">Save</button>
            </div>
        </form>
    </div>
</div>
}