import { context } from '../ui.js'
import { updatePost } from '../logic/updatePost'
import retrievePost from '../logic/retrievePost.js'
import { useState, useEffect } from 'react'

export default function EditPostModal({ onCancel, onPostUpdated, postId}) {
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
            updatePost(context.userId, postId, image, text, error =>{
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
    
    
    console.log('render EditPostModal')
    
    return <>
    {post && <section className="edit-post container">
    <form className="edit-post-form container" onSubmit={handleUpdatePost}>
                <input className="input" type="hidden" name="postId" />
                <input className="input" type="url" name="imageUrl" placeholder="image url" defaultValue={post.image} />
                <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={post.text}></ textarea>
                <button className="button" type="submit">UpdatePost</ button>
                <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </section>}
        </>
}

