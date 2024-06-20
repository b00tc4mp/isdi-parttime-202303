import { context } from "../../ui"
import deletePost from "../../logic/deletePost"
import { useContext } from "react"
import Context from "../../Context"
export default function DeletionPostModal({ postId, onConfirmDeletePost, onCancelDeletePost }) {

    const { generateToast } = useContext(Context)

    function handleDeletionPost(event) {
        event.preventDefault()
        try {
            deletePost(context.token, postId)
                .then(() => {
                    onConfirmDeletePost()

                    generateToast('Post deleted!', 'success')
                })
                .catch(error => {
                    generateToast(error.message, 'error')
                    return
                })
        } catch (error) {
            generateToast(error.message, 'error')
            console.log(error.stack)
        }
    }

    function onCancel(event) {
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