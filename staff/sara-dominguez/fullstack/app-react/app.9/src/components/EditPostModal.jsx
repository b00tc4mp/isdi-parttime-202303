import { context } from '../ui.js'
import { updatePost } from '../logic/updatePost'
import { retrievePost } from '../logic/retrievePost.js'
import { useState, useEffect } from 'react'
import useAppContext from '../hooks/UseAppContext.js'
import { Container, Input, Button, TextArea } from '../library'

export default function EditPostModal({ onCancel, onPostUpdated, postId }) {
    const { alert } = useAppContext()

    const [post, setPost] = useState(null)

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleUpdatePost(event) {
        event.preventDefault()

        const image = event.target.imageUrl.value
        const text = event.target.text.value

        try {
            updatePost(context.token, postId, image, text, error => {
                if (error) {
                    alert(error.message)

                    return
                }
                onPostUpdated()
            })

        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        try {
            retrievePost(context.token, postId, (error, post) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setPost(post)
            })

        } catch (error) {
            alert(error.message)
        }
    }, [postId])


    console.debug('render EditPostModal')

    return <>
        {post && <Container tag="section" className="edit-post">
            <Container tag="form" className="edit-post-form container" onSubmit={handleUpdatePost}>
                <Input type="hidden" name="postId" />
                <Input type="url" name="imageUrl" placeholder="image url" defaultValue={post.image} />
                <TextArea name="text" cols="30" rows="10" placeholder="text" defaultValue={post.text}></ TextArea>
                <Button type="submit">UpdatePost</ Button>
                <Button className="button cancel" type="button" onClick={handleCancel}>Cancel</Button>
            </Container>
        </Container>}
    </>
}

