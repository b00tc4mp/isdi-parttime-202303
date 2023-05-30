import { useState, useEffect, useContext } from 'react'

import { context } from '../ui'
import Context from '../Context'

import Container from '../library/Container'

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
            <Container tag="form" onSubmit={handleEditPost}>
            {post && <>
                    <img src={post.image} className="post-image"/>
                    <input className="input" type="url" name="image" placeholder="image url"defaultValue={post.image}/>
                    <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={post.text}></textarea>
                    </> 
                || <>
                    <input className="input" type="url" name="image" disabled placeholder="Loading..."/>
                    <textarea className="input" name="text" cols="30" rows="10" disabled placeholder="Loading..."></textarea>
                </>}               
                <button className="button" type="submit">Update</button>
                <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
            </Container>
        </Container>}
    </>        
    
}