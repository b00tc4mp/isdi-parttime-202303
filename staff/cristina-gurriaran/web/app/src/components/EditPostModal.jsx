import { context } from "../ui"
import updatePost from "../logic/updatePost" 
import retrievePost from "../logic/retrievePost"
import './Modals.css'
import { useState, useEffect, useContext } from 'react'
import Context from '../Context'


export default function EditpostModal({ onCancel , onPostUpdated, postId }) {

    const { alert } = useContext(Context)

    const [post, setPost] = useState(null)

    function handleCancel(event){
        event.preventDefault()
        onCancel()
    }


    function handleUpdatePost(event){
        event.preventDefault()

        const image = event.target.image.value
        const location = event.target.location.value
        const title = event.target.title.value
        const text = event.target.text.value
    
    
        try{
            updatePost(context.userId, postId, image, location, title, text, (error, post) => {
                
                if(error){
                    alert(error.message)
                    return
                }
                onPostUpdated()
            })
            
        } catch(error) {
            alert(error.message)
        }

    }

    useEffect(() => {
        try{
            retrievePost(context.userId, postId, (error, post) => {
                if(error){
                    alert(error.message)
                    return
                }
                setPost(post)
            })

        } catch (error){
            alert(error.message)
        }

    }, [postId])
  
    console.log('EditPostModal -> render')

    return <>
        {post && <section className='edit-post modal'>
            <form className="container" onSubmit={handleUpdatePost}>
                <input className="input" type="hidden" name="postId"/>
                <input className="input" type="url" name="image" placeholder="image url" defaultValue={post.image}/>
                <textarea className="input" name="location" placeholder="location" defaultValue={post.location}></textarea>
                <textarea className="input" name="title" placeholder="title" defaultValue={post.title}></textarea>
                <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={post.text}></textarea>
                <button className="button" type="submit">Update</button>
                <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </section>}
    </>
}