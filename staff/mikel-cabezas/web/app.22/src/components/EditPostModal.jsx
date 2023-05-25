import { context } from "../ui"
import {editPost} from '../logic/posts/editPost'
import { getPostbyId } from "../logic/helpers/dataManagers"

export function EditPostModal( { postId, onCancel, onPostUpdated }) {
    const userId = context.userId
    const post = getPostbyId(postId)

    function handleCancelEditPost(event) {
        event.preventDefault()
        onCancel()
    }
    function handleUpdateEditPost(event) {
        event.preventDefault()
        const title = event.target.parentElement.parentElement.elements['title'].value
        const text = event.target.parentElement.parentElement.elements['text'].value
        const image = event.target.parentElement.parentElement.children['post-image'].src
        editPost(userId, postId, title, text, image)
        onPostUpdated()
    }

    return  <div className="overlay edit-post">
    <form className="edit-post">
        <input type="hidden" />
        <label htmlFor="text">Edit title</label>
        <input type="text" className="title" name="title" defaultValue={post.title}/>
        <img className="post-image" name="post-image" src={post.image} alt="" />
        <label htmlFor="file">Edit your image</label>
        <input type="file" name="file" id="" accept=".jpg, .jpeg, .png, .webp" />
        <label htmlFor="textarea">Edit your process</label>
        <textarea id="" cols="30" rows="5" name="text" defaultValue={post.text}></textarea>
        <div className="buttons">
            <button className="button--edit-post_cancel" type="cancel" onClick={handleCancelEditPost}>Cancel</button>
            <button className="button--edit-post_save" type="submit" onClick={handleUpdateEditPost}>Update post</button>
        </div>
    </form>
</div>
}