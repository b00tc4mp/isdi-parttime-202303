import { context } from '../ui'
import updatePost from '../logic/updatePost'
import retrievePost from '../logic/retrievePost'
import { useState, useEffect } from 'react'
import Container from '../library/Container'

export default function EditPostModal({ onCancel, onPostUpdated, postId }) {
    const [post, setPost] = useState(null)

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

    useEffect(() => {
        try {
            retrievePost(context.userId, postId, (error, post) => {
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


    console.debug('EditPostModal -> render')

    return <>
        {post && <Container tag="section" className="modal">
            <Container tag="form" className="container" onSubmit={handleupdatePost}>
                <input className="input" type="url" name="image" placeholder="image url" defaultValue={post.image} />
                <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={post.text}></textarea>
                <button className="button" type="submit">Update</button>
                <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
            </Container>
        </Container>}
    </>
}