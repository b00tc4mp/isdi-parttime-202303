import { context } from '../ui'
import createPost from '../logic/createPost'
import Container from '../library/Container'

export default function AddPostModal({ onCancel, onPostCreated }) {
    console.debug('AddPostModal -> render')

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            createPost(context.token, image, text, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onPostCreated()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    console.debug('AddPostModal -> render')

    return <Container tag="section" className="modal">
        <Container tag="form" onSubmit={handleCreatePost}>
            <input className="input" type="url" name="image" placeholder="image url" />
            <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
            <button className="button" type="submit">Create</button>
            <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
        </Container>
    </Container>
}