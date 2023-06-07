import retrievePost from '../logic/retrievePost'
import editPost from '../logic/editPost'
import { context } from '../ui'
import { useEffect, useState } from 'react'

export default function EditPost({onCancel, postId, onPostEdited, onPostDeleted}) {
    const [post, setPost] = useState()

    const handleCancelEdit = () => onCancel()

    const handleUpdatePost = (event) => {
        event.preventDefault()

        if(confirm('Are you sure you want to edit?')){
            const image = event.target.url.value
            const text = event.target.text.value

            try{
                freeze()

                editPost(context.userId, postId, image, text, error => {
                    unfreeze()

                    if(error){
                        alert(error.message)

                        return
                    }

                    onPostEdited()
                })
            } catch(error){
                alert(error.message)
            }
        }
    }

    useEffect(() => {
        try{
            freeze()

            retrievePost(context.userId, postId, (error, post) => {
                unfreeze()
                
                if(error){
                    alert(error.message)
    
                    return
                }
    
                setPost(post)
            })
        } catch(error){
            alert(error.message)
        }
    }, [])


        return <section className="modal-window" name="modal-edit-post">
            <form action="" onSubmit={handleUpdatePost}>
                <input type="hidden" name="hidden"/>
                {post && <>
                <input className="input-field" type="url" name="url" defaultValue={post.image}/>
                <textarea name="text" cols="30" rows="10" className="post-text input-field" defaultValue={post.text}></textarea>
                </> || <>
                    <input className="input-field" disabled placeholder="Loading..."></input>
                    <textarea cols="30" rows="10" className="post-text input-field" disabled placeholder="Loading..."></textarea>
                </>}
                <div className="buttons">
                    {/* <button className="submit-buttons" type="button" onClick={handleDelete}>Delete</button> */}
                    <button className="submit-buttons" type="submit">Update</button>
                    <button className="submit-buttons cancel-edition" type="button" onClick={handleCancelEdit}>Cancel</button>
                </div>
            </form>
        </section>
}