import createPost from '../logic/createPost'
import { context } from '../ui'

function AddPostModal(props) {
    console.log(props)
    function handleCancelAddPost(event) {
        event.preventDefault()
        
        onCancel()
    }
    
    function handleCreatePost(event){
        event.preventDefault()

        const image = event.target.image.value,
            text = event.target.text.value;
                        
        try {
            createPost(context.userId, image, text) 

            onPostCreate()

        }catch (error){
            alert(error.message)
        }
    }
        return <section className="add-post container">
            <form className="container" onSubmit={handleCreatePost}>
                <input className="input" type="url" name="image" placeholder="image url" />
                <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
                <button className="button" type="submit">Create</button>
                <button className="button cancel" type="button" onClick={handleCancelAddPost}>Cancel</button>
            </form>
        </section>
}

export default AddPostModal