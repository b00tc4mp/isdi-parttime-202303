import {updatePost} from '../logic/updatePost.js'
import { context }  from '../ui.js'
import retrievePost from '../logic/retrievePost.js'

export function EditPostModal ({onCancel, onPostUpdated, postId}){
    console.log('AddPostModal -> render')

    function handleCancel (event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost (event) {
        event.preventDefault()

        const image = event.target.imageUrl.value 
        const text = event.target.text.value 

        try {
            updatePost(context.userId, postId, image, text)

            onPostUpdated()
        } catch (error) {
            alert(error.message)
        }
    }

    try {
        const {image, text} = retrievePost(context.userId, postId)

    return <section className="edit-post container">
        <form className="edit-post-form container" onSubmit={handleCreatePost}>
            <input className="input" type="url" name="imageUrl" placeholder="image url" defaultValue={image}/>
            <textarea className="input" name="text" cols="30" rows="10" placeholder="text" defaultValue={text}></textarea>
            <button className="button" type="submit">Update</button>
            <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button> 
        </form>
    </section>
    } catch (error) {
        alert(error.message)
        return null
    }
}