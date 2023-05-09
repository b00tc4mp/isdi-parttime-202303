//import { findPostById } from "../logic/helpers/data-managers"
import retrievePost from "../logic/retrivePost"
import { context } from "../ui"
import { updatePost } from "../logic/updatePost"

export default function EditPost ({ onPostUpdated, onCancel, postId }) {
    
    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleupdatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            updatePost(context.userId, postId, image, text)

            onPostUpdated()
        } catch (error) {
            alert(error.message)
        }
    }

    const post = retrievePost(context.userId, postId)

    return <div className="home__post--edit modal">
            <form className="post__form" onSubmit={handleupdatePost}>
                <input className="input" type="hidden" name="postId"/>
                <input className="form__input" type="url" name="image" placeholder="new post image url" defaultValue={post.image}/>
                <textarea className="form__input--text" name="text" cols="30" rows="10" placeholder="new post text" defaultValue={post.text}></textarea>
                <div className="new-post__form--buttons">
                    <button className="form__button" type="submit">Update</button>
                    <button className="form__button cancel__button" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
} 