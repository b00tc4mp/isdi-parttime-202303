import PropTypes from 'prop-types'
import { findPostById } from '../logic/helpers/dataManagers'
import editPost from '../logic/editPost'
import { context } from '../ui'

export default function EditPost({onCancel, postId, onPostEdited}) {
    EditPost.propTypes = {
        onCancel: PropTypes.func,
        postId: PropTypes.string,
        onPostEdited: PropTypes.func
    }

    const handleCancelEdit = () => onCancel()

    const handleUpdatePost = (event) => {
        event.preventDefault()

        const image = event.target.url.value
        const text = event.target.text.value

        try{
            editPost(context.userId, postId, image, text)

            onPostEdited()
        } catch(error){
            alert(error.message)
        }
    }

    const post = findPostById(postId)

    return <section className="modal-window" name="modal-edit-post">
    <form action="" onSubmit={handleUpdatePost}>
        <input type="hidden" name="hidden"/>
        <input className="input-field" type="url" name="url" defaultValue={post.image}/>
        <textarea name="text" cols="30" rows="10" className="post-text input-field" defaultValue={post.text}></textarea>
        <div className="buttons">
            <button className="submit-buttons" type="submit">Update</button>
            <button className="submit-buttons cancel-edition" type="button" onClick={handleCancelEdit}>Cancel</button>
        </div>
    </form>
</section>
}