import createPost from '../logic/createPost'
import Container from '../library/Container'
import { useAppContext } from '../hooks'


export default function AddPostModal({ onCancel, onPostCreated }) {
    console.debug('AddPostModal -> render')

    const { alert } = useAppContext()

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            createPost(image, text)
                .then(onPostCreated)
                .catch(error => alert(error.message))
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