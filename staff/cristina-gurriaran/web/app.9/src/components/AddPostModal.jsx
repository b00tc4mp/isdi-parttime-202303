import { context } from '../ui' 
import createPost from '../logic/createPost'
import './Modals.css'

export default function AddPostModal({ onCancel, onPostCreated }) {
    console.log('AddPostModal -> render')

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            createPost(context.userId, image, text)

            onPostCreated()
        } catch(error) {
            alert(error.message)
        }
    }

    return <section className="add-post modal">
        <form className="container" onSubmit={handleCreatePost}>
            <input className="input" type="url" name="image" placeholder="image url" />
            <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
            <button className="button" type="submit">Create</button>
            <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
        </form>
    </section>
}