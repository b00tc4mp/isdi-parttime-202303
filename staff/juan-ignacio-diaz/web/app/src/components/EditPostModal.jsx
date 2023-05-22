import { useState, useEffect } from 'react'
import { context } from '../ui'

import updatePost from '../logic/updatePost'
import retrievePost from '../logic/retrievePost'

export default function EditPost({ onCancel, onEditedPost, postId, onMenssageAlert}) {
    const [post, setPost] = useState(null)

    useEffect(() => {
        try {
            retrievePost(context.userId, postId, (error, post) => {
                if (error) {
                    onMenssageAlert(error.message)

                    return
                }

                setPost(post)
            })
        } catch (error) {
            onMenssageAlert(error.message)
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
                    onMenssageAlert(error.message)

                    return
                }
                
                onEditedPost()
            })

        } catch(error) {
            onMenssageAlert(error.message)
        }
    }

    return <>
        {post && <section className="edit-post container">
            <form className="container" onSubmit={handleEditPost}>
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
            </form>
        </section>}
    </>        
    
}