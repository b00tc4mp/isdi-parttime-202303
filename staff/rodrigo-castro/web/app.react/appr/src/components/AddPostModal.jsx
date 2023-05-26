import { context } from '../ui'
import { createPost } from '../logic/createPost'

export default function AddPostModal({ onCancel, onPostCreated }) {    
    function handleCancel (event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost (event) {
        event.preventDefault()

        const image = event.target.url.value,
        text = event.target.text.value

        try{
            createPost(context.userId, image, text, error => {
                if(error){
                    alert(error.message)

                    return
                }
                
                onPostCreated()
            })
        } catch(error){
            alert(error.message)
        }
    }

    return <section className="modal-window" name="modal-new-post">
    <form className="form-new-post" action="" onSubmit={handleCreatePost}>
        <input className="input-field" type="url" name="url" placeholder="Insert image url"/>
        <textarea name="text" cols="30" rows="10" className="post-text input-field" placeholder="Insert caption"></textarea>
        <div className="buttons">
            <button className="submit-buttons submit-post" type="submit">Post</button>
            <button className="submit-buttons cancel-post" type="button" onClick={handleCancel}>Cancel</button>
        </div>
    </form>
    </section>
}