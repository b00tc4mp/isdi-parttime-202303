import PropTypes from 'prop-types'
import { context } from '../ui'
import createPost from '../logic/create-post'

export default function AddPostModal({ onCancel, onPostCreated }) {

    AddPostModal.propTypes = {
        onCancel: PropTypes.func,
        onPostCreated: PropTypes.func
    }

    console.log('AddPostModal -> render')

    function handleCancel(e) {
        e.preventDefault()

        onCancel()
    }

    function handleCreatePost(e) {
        e.preventDefault()

        const image = e.target.image.value
        const text = e.target.text.value

        try {
            createPost(context.userId, image, text)

            onPostCreated()
        } catch (error) {
            alert(error.message)
        }
    }

    return <section className="modal container">
        <form className="container" onSubmit={handleCreatePost}>
            <input className="input" type="url" name="image" placeholder="image url" />
            <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
            <button className="button" type="submit">Create</button>
            <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
        </form>
    </section>
}