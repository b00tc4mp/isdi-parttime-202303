import { context } from '../ui' 
import createPost from '../logic/createPost'
import './Modals.css'

export default function AddPostModal({ onCancel, onPostCreated }) {

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const location = event.target.location.value
        const title = event.target.title.value
        const text = event.target.text.value

        try {
            createPost(context.userId, image, location, title, text)

            onPostCreated()
        } catch(error) {
            alert(error.message)
        }
    }

    console.log('AddPostModal -> render')

    return <section className="add-post modal">
        <form className="container" onSubmit={handleCreatePost}>
            <input className="input" type="url" name="image" placeholder="image url" />
            <textarea className="input" name="location" placeholder="location"></textarea>
            <textarea className="input" name="title" placeholder="title"></textarea>
            <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
            <button className="button" type="submit">Create</button>
            <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
        </form>
    </section>
}