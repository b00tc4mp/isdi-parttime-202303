import { context } from '../ui.js'
import PropTypes from 'prop-types'
// import createPost from '../logic/createPost.js'

export default function AddPostModal({ onCancel, onPost }) {
    AddPostModal.propTypes = {
        onCancel: PropTypes.func,
        onPost: PropTypes.func
    }
    
    function handleCancel (event) {
        event.preventDefault()

        onCancel()
    }

    // function handlePost (event) {
    //     event.preventDefault()

    //     const url = event.target.url.value,
    //     text = event.target.text.value

    //     try{

    //         onPost()
    //     } catch(error){
    //         alert(error.message)
    //     }
    // }

    return <section className="modal-window" name="modal-new-post">
    <form className="form-new-post" action="">
        <input className="input-field" type="url" name="url" placeholder="Insert image url"/>
        <textarea name="text" cols="30" rows="10" className="post-text input-field" placeholder="Insert caption"></textarea>
        <div className="buttons">
            <button className="submit-buttons submit-post" type="submit">Post</button>
            <button className="submit-buttons cancel-post" type="button" onClick={handleCancel}>Cancel</button>
        </div>
    </form>
    </section>
}