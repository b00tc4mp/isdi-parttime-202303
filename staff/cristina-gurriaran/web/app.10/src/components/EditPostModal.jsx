import { context } from "../ui"
import updatePost from "../logic/updatePost" 
import retrievePost from "../logic/retrievePost"
import './Modals.css'


export default function EditpostModal({ onCancel , onPostUpdated, postId }) {

    function handleCancel(event){
        event.preventDefault()
        onCancel()
    }


    function handleUpdatePost(event){
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value
    
    
        try{
            updatePost(context.userId, postId, image, text)
            onPostUpdated()

        } catch(error) {
            alert(error.message)
        }

    }

    
    try{
        const { image, text } = retrievePost(context.userId, postId)
        console.log('EditPostModal -> render')

        return <section className='edit-post modal'>
            <form className="container" onSubmit={handleUpdatePost}>
                <input className="input" type="hidden" name="postId"/>
                <input className="input" type="url" name="image" placeholder="image url" defaultValue={image}/>
                <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={text}></textarea>
                <button className="button" type="submit">Update</button>
                <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </section>

    } catch (error){
        alert(error.message)

        return null
    }

}