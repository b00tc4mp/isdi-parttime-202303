import { useState, useEffect, useContext } from 'react'

import { context } from '../ui'
import Context from '../Context'

import { Container, Form, Input, Button } from '../library'

import updatePost from '../logic/updatePost'
import retrievePost from '../logic/retrievePost'

export default function EditPost({ onCancel, onEditedPost, postId}) {
    const { alert, freeze, unfreeze } = useContext(Context)
    const [post, setPost] = useState(null)

    useEffect(() => {
        try {
            freeze()
            retrievePost(context.userId, postId, (error, post) => {
                unfreeze()
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
    
    function handleCancel(event) {  
        event.preventDefault()

        onCancel()
    }

    function handleEditPost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            updatePost (context.userId, postId, image, text, error => {
                if (error) {
                    alert(error.message)

                    return
                }         

                onEditedPost()
            })
        } catch(error) {
            alert(error.message)
        }
    }

    return <>
        {post && <Container tag="section" className="modal">
            <Form onSubmit={handleEditPost}>
            {post && <>
                    <img src={post.image} className="post-image"/>
                    <Input className="input" type="url" name="image" placeholder="image url"defaultValue={post.image}/>
                    <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={post.text}></textarea>
                    <Button type="submit">Update</Button>
                    </> 
                || <>
                    <Input className="input" type="url" name="image" disabled placeholder="Loading..."/>
                    <textarea className="input" name="text" cols="30" rows="10" disabled placeholder="Loading..."></textarea>
                </>}                        
                <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
            </Form>
        </Container>}
    </>        
    
}