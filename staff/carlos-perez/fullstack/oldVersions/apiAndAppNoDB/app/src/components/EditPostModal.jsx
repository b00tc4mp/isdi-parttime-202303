import { context } from '../main.js'
import updatePost from '../logic/updatePost'
import retrievePost from '../logic/retrievePost'
import { useState, useEffect } from 'react'

export default function EditPostModal({ onCancel, onPostUpdated, postId }) {
    console.log('EditPostModal -> render')

    const [post, setPost]= useState(null);

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleUpdatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            updatePost(context.userId, postId, image, text, error =>{
                if(error){
                    alert(error.message);
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


    console.debug('EditPostModal -> render')

    

        return <>
        {post && <section className="modal container">
            <form className="container" onSubmit={handleUpdatePost}>
                <input className="input" type="url" name="image" placeholder="URL de imagen" defaultValue={post.image} />
                <textarea className="input" name="text" cols="30" rows="10" placeholder="Tus ideas y pensamientos" defaultValue={post.text}></textarea>
                <button className="boton boton--primario" type="submit">Actualizar</button>
                <button className="boton boton--primario cancel" type="button" onClick={handleCancel}>Cancelar</button>
            </form>
        </section>}
        </>
}