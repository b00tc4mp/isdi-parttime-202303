import { context } from '../ui' 
import { useAppContext } from '../hooks'

import { Container, Form, Input, Button } from '../library'

import createPost from '../logic/createPost'

export default function AddPostModal({ onCancel, onCreatedPost }) {
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
            createPost(context.userId, image, text, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onCreatedPost()
            })
        } catch(error) {
            alert(error.message)
        }
    }

    return <>
        <Container tag="section" className="modal">
            <Form onSubmit={handleCreatePost}>
                <Input type="url" name="image" placeholder="image url"/>
                <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
                <Button type="submit">Create</Button>
                <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
            </Form>
        </Container>
    </>
}