import {context} from '../ui'
import updatePost from '../logic/update-post'
import retrievePost from '../logic/retrieve-posts'

export default function EditPostModal({ onCancel, onPostUpdated, postId}) {
    console.log('EditPostModal -> render')

    function handleCancel(e) {
        e.preventDefault()

        onCancel()
    }

    function handleUpdatePost(e) {
        e.preventDefault()

        const image = e.target.image.value 
        const text = e.target.text.value

        try {
            updatePost(context.userId, postId, image, text)

            onPostUpdated()
        } catch (error) {
            alert(error.message)
        }
    }

    try {
        const {image, text} = retrievePost(context.userId, postId)

        return <section className="modal container">
            <form className="container" onSubmit={handleUpdatePost}>
                <input className="input" type="url" name="image" placeholder="image url" defaultValue={image} />
                <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={text}></textarea>
                <button className="button" type="submit">Update</button>
                <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </section>
    } catch (error) {
        alert(error.message)

        return null
    }
}