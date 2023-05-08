import { context } from '../ui'
import updatePost from '../logic/updatePost'
import retrievePost from '../logic/retrievePost'

export default function EditPostModal({ onCancel, onPostUpdated, postId }) {
    console.log('EditPostModal -> render')

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

    try {
        const { image, text } = retrievePost(context.userId, postId)

        return <section className="modal container">
            <form className="container" onSubmit={handleupdatePost}>
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