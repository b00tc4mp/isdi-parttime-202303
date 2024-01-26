import createPost from '../logic/createPost.js'
import { context } from '../ui.js'
// import { useAppContext } from 'react'
import useAppContext from '../hooks/UseAppContext.js'
import { Container, Input, Button, TextArea } from '../library'

export default function AddPostModal({ onCancel, onPostCreated }) {
    console.debug('AddPostModal -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.imageUrl.value
        const text = event.target.text.value

        try {
            freeze()
            createPost(context.userId, image, text, error => {
                unfreeze()
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

    return <Container tag="section" className="add-post">
        <Container tag="form" className="add-post-form" onSubmit={handleCreatePost}>
            <Input type="url" name="imageUrl" placeholder="image url" />
            <TextArea name="text" cols="30" rows="10" placeholder="text"></TextArea>
            <Button className="button" type="submit">Create</Button>
            <Button className="button cancel" type="button" onClick={handleCancel}>Cancel</Button>
        </Container>
    </Container>
}  